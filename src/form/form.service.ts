import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { SubmitFormDto } from './dtos/submit-form.dto';
// FIXME: fix the package and improt '@pardjs/recaptcha-server'
import Recaptcha from '@pardjs/recaptcha-server/dist/lib/recaptcha-server.js';
import { ConfigService } from 'src/config/config.service';
import { logger } from '@pardjs/common';
import { Repository } from 'typeorm';

import { getConnection } from 'typeorm';

import { FORM_ERRORS } from './errors';
import { FormRecord } from './form-record.entity';

@Injectable()
export class FormService {
  private readonly reccaptcha: Recaptcha;

  constructor(
    config: ConfigService,
    @Inject('FORM_REPOSITORY')
    private readonly formRepository: Repository<FormRecord>,
  ) {
    this.reccaptcha = new Recaptcha(config.get('RECAPTCHA_SECRET'), 3000);
  }

  async submit(data: SubmitFormDto): Promise<void> {
    try {
      // TODO: fetch config

      // TODO: enable validation reCaptcha by config.
      // 验证recaptcha token是否有效
      if (data.token) {
        const verifyResult = await this.reccaptcha.verifyV3Async(data.token);
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

      // TODO: send notification
      return;
    } catch (error) {
      // TODO: Add sentry
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
