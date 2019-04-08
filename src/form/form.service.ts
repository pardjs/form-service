import { Injectable } from '@nestjs/common';
import { SubmitFormDto } from './dtos/submit-form.dto';
import Recaptcha from '@pardjs/recaptcha-server';
import { ConfigService } from 'src/config/config.service';
import { logger } from '@pardjs/common';

@Injectable()
export class FormService {
  private readonly recInstance: Recaptcha;

  constructor(config: ConfigService) {
    // FIXME: init the recaptcha instance
    logger.info('>> config', config.get('RECAPTCHA_SECRET'));
    this.recInstance = new Recaptcha('fdas', 3000);
  }

  async submit(data: SubmitFormDto): Promise<void> {
    // TODO: validation reCaptcha
    // TODO: fetch config
    // TODO: record submit success
    // TODO: send notification
    return;
  }

  async findAll(): Promise<any[]> {
    return;
  }
}
