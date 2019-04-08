import { Injectable } from '@nestjs/common';
import { SubmitFormDto } from './dtos/submit-form.dto';

@Injectable()
export class FormService {
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
