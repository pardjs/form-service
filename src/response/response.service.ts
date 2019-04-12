import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Recaptcha from '@pardjs/recaptcha-server';
import Notification from '@pardjs/notification';
import { logger } from '@pardjs/common';

import { EnvService } from '../env';
import { ResponseEntity, ERRORS } from '.';
import { SubmitResponseDto } from './dto';

@Injectable()
export class ResponseService {
  private readonly recaptcha: Recaptcha;
  private notify: Notification;
  private readonly senderAddress: string;

  constructor(
    config: EnvService,
    @InjectRepository(ResponseEntity)
    private readonly responseRepository: Repository<ResponseEntity>,
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

  async submit(data: SubmitResponseDto): Promise<any> {
    try {
      // TODO: fetch config
      // TODO: enable validation reCaptcha by config.
      // 验证recaptcha token是否有效
      if (data.token) {
        const verifyResult = await this.recaptcha.verifyV3Async(data.token);
        if (!verifyResult.isPassed) {
          logger.info('Invalid reCaptcha result', { data, verifyResult });
          throw new BadRequestException(ERRORS.NOT_VALID_HUMAN);
        }
      }
      // 保存请求成功的记录
      const removedKeys = ['token', 'configId'];
      const record = Object.keys(data).reduce((recordInfo, key) => {
        if (!removedKeys.includes(key)) {
          recordInfo[key] = data[key];
        }
        return recordInfo;
      }, {});
      await this.responseRepository.save({
        configId: data.configId,
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
      throw new InternalServerErrorException(ERRORS.FORM_SUBMIT_INTERNAL_ERROR);
    }
  }

  // [internal] 获取某个config的全部留言
  async findAllById(configId: string): Promise<any> {
    const [data, total] = await this.responseRepository.findAndCount({
      where: { configId },
    });
    return {
      total,
      data,
    };
  }
}
