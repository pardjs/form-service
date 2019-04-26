import {
  Controller,
  Body,
  Post,
  Headers,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { logger } from '@pardjs/common';

import { CreateResponseDto, ResponseResDto } from './dto';
import { ResponseService, ERRORS } from '.';
import { httpErrorHandler } from '../uilts';

@Controller('responses')
@ApiUseTags('Response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseResDto,
  })
  async create(
    @Body() data: CreateResponseDto,
    @Headers('Accept-Language') lang?: string,
  ): Promise<ResponseResDto> {
    try {
      logger.info('Submit response', data);
      const sendRes = await this.responseService.create(data);
      return sendRes;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async removeOne(
    @Param('id') responseId: string,
    @Headers('Accept-Language') lang: string,
  ): Promise<void> {
    try {
      await this.responseService.removeOne(responseId);
      return;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
