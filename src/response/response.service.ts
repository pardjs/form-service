import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Axios from 'axios';
import * as Handlebars from 'handlebars';

import Recaptcha from '@pardjs/recaptcha-server';
import Notification from '@pardjs/notification';
import { logger } from '@pardjs/common';

import { EnvService } from '../env';
import { ResponseEntity } from '.';
import { CreateResponseDto, ResponseResDto } from './dto';
import { ConfigEntity } from '../config';

@Injectable()
export class ResponseService {
  private readonly recaptcha: Recaptcha;
  private notify: Notification;
  private readonly senderAddress: string;
  private readonly templatePath: string;

  constructor(
    envs: EnvService,
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
    @InjectRepository(ResponseEntity)
    private readonly responseRepository: Repository<ResponseEntity>,
  ) {
    this.templatePath = envs.get('TEMPLATE_PATH');
    this.senderAddress = envs.get('SEND_EMAIL_ADDRESS');
    this.recaptcha = new Recaptcha(envs.get('RECAPTCHA_SECRET'), 3000);
    this.notify = new Notification({
      aliAppId: envs.get('ALI_APP_ID'),
      aliSecret: envs.get('ALI_APP_SECRET'),
      senderName: '灵鹞邮件通知',
      senderEmail: this.senderAddress,
      emailTitle: '系统通知邮件(请勿回复)',
      aliMailTimeout: 4000,
    });
  }

  async buildContent(
    record: { [key: string]: any },
    templateName?: string,
  ): Promise<string> {
    let content: string;
    let templateUrl: string;
    let template: string;

    if (this.templatePath && templateName) {
      templateUrl = this.templatePath + templateName;
    }

    try {
      const { data: hbsTemplate } = await Axios.get(templateUrl, {
        responseType: 'text',
      });

      if (hbsTemplate) {
        template = Handlebars.compile(hbsTemplate)(record);
      }
    } catch (error) {
      logger.error('Failed to fetch template', { error });
    }

    if (template) {
      content = template;
    } else {
      content = Object.keys(record)
        .map(key => `${key} :${record[key]}`)
        .join('\n');
    }

    return content;
  }

  // FIXME: define the type of response
  async create(data: CreateResponseDto): Promise<any> {
    try {
      const configInfo = await this.configRepository.findOne({
        hashId: data.id,
      });
      // TODO: enable validation reCaptcha by config.
      // 验证recaptcha token是否有效
      if (configInfo.isReCaptchaRequired) {
        if (!data.token) {
          // FIXME: Replace with general error;
          throw new Error('Missing ReCaptcha token');
        }
        const verifyResult = await this.recaptcha.verifyV3Async(data.token);
        if (!verifyResult.isPassed) {
          logger.info('Invalid reCaptcha result', { data, verifyResult });
          // FIXME: Replace with general error;
          throw new Error('Invalid recaptcha result');
        }
      }

      // 保存请求成功的记录
      const removedKeys = ['token', 'id'];
      const record = Object.keys(data).reduce((recordInfo, key) => {
        if (!removedKeys.includes(key)) {
          recordInfo[key] = data[key];
        }
        return recordInfo;
      }, {});
      const result = await this.responseRepository.save({
        config: configInfo,
        content: record,
      });

      // 发送邮件通知
      // FIXME: export SendMailResponse interface
      let emailRes: {
        EnvId: string;
        RequestId: string;
      };
      if (configInfo.isNotifyByMail && configInfo.notifyMails) {
        if (!configInfo.notifyMails) {
          // FIXME: general error class with type info.
          throw new Error('Missing Email address');
        }
        emailRes = await this.notify.sendMail({
          senderAddress: configInfo.senderEmail || this.senderAddress,
          senderName: configInfo.senderName || 'Dozto',
          toAddresses: configInfo.notifyMails,
          title: configInfo.mailTitle || '留言通知',
          content: await this.buildContent(
            Object.assign(record, { id: result.id, title: configInfo.name }),
            configInfo.templateName,
          ),
        });
      }

      return emailRes ? Object.assign(result, { emailRes }) : result;
    } catch (error) {
      // TODO: Add sentry
      logger.error('Failed to send email', { error });
      throw error;
    }
  }

  async removeOne(responseId: string): Promise<void> {
    try {
      await this.responseRepository.delete(responseId);
      return;
    } catch (error) {
      logger.error('Failed to remove response', { error });
      throw error;
    }
  }

  async queryByConfigId(
    configId: number,
    params: { limit: number; offset: number },
  ): Promise<{ data: ResponseResDto[]; total: number }> {
    const [data, total] = await this.responseRepository.findAndCount({
      where: { config: configId },
      take: params.limit || 10,
      skip: params.offset || 0,
    });

    return {
      data,
      total,
    };
  }
}
