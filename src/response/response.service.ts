import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Recaptcha from '@pardjs/recaptcha-server';
import Notification from '@pardjs/notification';
import { logger } from '@pardjs/common';

import { EnvService } from '../env';
import { ResponseEntity } from '.';
import { CreateResponseDto } from './dto';
import { ConfigEntity } from '../config';

@Injectable()
export class ResponseService {
  private readonly recaptcha: Recaptcha;
  private notify: Notification;
  private readonly senderAddress: string;

  constructor(
    envs: EnvService,
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
    @InjectRepository(ResponseEntity)
    private readonly responseRepository: Repository<ResponseEntity>,
  ) {
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

  buildContent(record: { [key: string]: any }, templateName?: string): string {
    let content: string;
    if (templateName) {
      // TODO: load template （html） and build the content.
    } else {
      // TODO: send default message
    }

    content = Object.keys(record)
      .map(key => `${key} :${record[key]}`)
      .join('|');

    return content;
  }

  // FIXME: define the type of response
  async create(data: CreateResponseDto): Promise<any> {
    try {
      // TODO: fetch config
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
          content: this.buildContent(record, configInfo.templateName),
        });
      }

      return emailRes ? Object.assign(result, { emailRes }) : result;
    } catch (error) {
      // TODO: Add sentry
      logger.error('Failed to send email', { error });
      throw error;
    }
  }
}
