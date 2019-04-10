import { Controller, Body, Post, Get, HttpStatus, Param } from '@nestjs/common';
import { SubmitFormDto } from './dtos/submit-form.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { SubmitFormResDto } from './dtos/submit-form-res.dto';
import { ErrorResDto } from './dtos/error-res.dot';
import { logger } from '@pardjs/common';

import { FormService } from './form.service';

interface StandError {
  type?: string;
  message: string;
}

@Controller('api')
@ApiUseTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('/form')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SubmitFormResDto,
  })
  async submit(
    @Body() data: SubmitFormDto,
  ): Promise<SubmitFormResDto | ErrorResDto | any> {
    logger.debug('submit form', data);
    const sendRes = await this.formService.submit(data);
    return {
      status: 'success',
      data: sendRes,
    };
  }

  @Get('clients/:clientId/form-records')
  async getRecords(@Param('clientId') clientId: string): Promise<any> {
    return await this.formService.findAllById(clientId);
  }
}
