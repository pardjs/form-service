import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { SubmitFormDto } from './dtos/submit-form.dto';
// FIXME: fix the package and improt '@pardjs/recaptcha-server'
import Recaptcha from '@pardjs/recaptcha-server/dist/lib/recaptcha-server.js';
import Notification from '@pardjs/notification';
import { ConfigService } from 'src/config/config.service';
import { logger } from '@pardjs/common';
import { Repository } from 'typeorm';

import { getConnection } from 'typeorm';

import { FORM_ERRORS } from './errors';
import { FormRecord } from './form-record.entity';

@Injectable()
export class FormService {
  private readonly recaptcha: Recaptcha;
  private notify: Notification;
  private readonly senderAddress: string;

  constructor(
    config: ConfigService,
    @Inject('FORM_REPOSITORY')
    private readonly formRepository: Repository<FormRecord>,
  ) {
    this.senderAddress = config.get('SEND_EMAIL_ADDRESS');
    this.recaptcha = new Recaptcha(config.get('RECAPTCHA_SECRET'), 3000);
    this.notify = new Notification({
      aliAppId: config.get('ALI_APP_ID'),
      aliSecret: config.get('ALI_APP_SECRET'),
      senderName: '灵鹞邮件通知',
      senderEmail: this.senderAddress,
      emailTitle: '系统通知邮件(请勿回复)',
      aliMailTimeout: 4000,
    });
  }

  async submit(data: SubmitFormDto): Promise<any> {
    try {
      // TODO: fetch config
      // TODO: enable validation reCaptcha by config.
      // 验证recaptcha token是否有效
      if (data.token) {
        const verifyResult = await this.recaptcha.verifyV3Async(data.token);
        if (!verifyResult.isPassed) {
          logger.info('Invalid reCaptcha result', { data, verifyResult });
          throw new BadRequestException(FORM_ERRORS.NOT_VALID_HUMAN);
        }
      }
      // 保存请求成功的记录
      const removedKeys = ['token', 'clientId'];
      const record = Object.keys(data).reduce((recordInfo, key) => {
        if (!removedKeys.includes(key)) {
          recordInfo[key] = data[key];
        }
        return recordInfo;
      }, {});
      await this.formRepository.save({
        clientId: data.clientId,
        content: record,
      });
      // 发送邮件通知
      // TODO: replace with config data.
      const res = await this.notify.sendMail({
        senderAddress: this.senderAddress,
        senderName: 'Dozto',
        toAddresses: ['ole3021@gmail.com', 'do021service@gmail.com'],
        title: '留言通知',
        content: '测试留言',
      });
      return res;
    } catch (error) {
      // TODO: Add sentry
      logger.error('Failed to send email', { error });
      throw new InternalServerErrorException(
        FORM_ERRORS.FORM_SUBMIT_INTERNAL_ERROR,
      );
    }
  }

  // [internal] 获取某个client的全部留言
  async findAllById(clientId: string): Promise<any> {
    const [data, total] = await this.formRepository.findAndCount({
      where: { clientId },
    });
    return {
      total,
      data,
    };
  }
}
