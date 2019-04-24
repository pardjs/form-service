import { Controller, Body, Post, Headers, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { logger } from '@pardjs/common';

import { CreateResponseDto, ResponseResDto } from './dto';
import { ResponseService, ERRORS } from '.';
import { httpErrorHandler } from '../uilts';

@Controller('api')
@ApiUseTags('Response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}
  @Post('/responses')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseResDto,
  })
  async create(
    @Body() data: CreateResponseDto,
    @Headers('Accept-Language') lang: string,
  ): Promise<ResponseResDto> {
    try {
      logger.info('Submit response', data);
      const sendRes = await this.responseService.create(data);
      return sendRes;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
