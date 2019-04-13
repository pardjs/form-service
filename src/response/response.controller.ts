import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { logger } from '@pardjs/common';

import { CreateResponseDto, ResponseResDto } from './dto';
import { ResponseService, ERRORS } from '.';

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
  ): Promise<ResponseResDto | HttpException> {
    try {
      logger.info('Submit response', data);
      const sendRes = await this.responseService.create(data);
      return sendRes;
    } catch (error) {
      throw new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }
}
