import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { logger } from '@pardjs/common';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';

import { ERRORS, ResponseService } from '.';
import { FormServiceAuthPoints } from '../auth-points';
import { httpErrorHandler } from '../utils';
import { CreateResponseDto, ResponseResDto } from './dto';

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
    @Headers('accept-language') lang?: string,
    @Headers('referer') referer?: string,
  ): Promise<ResponseResDto> {
    try {
      logger.info('Submit response', data);
      const sendRes = await this.responseService.create(data, referer);
      return sendRes;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.REMOVE_RESPONSE)
  @UseGuards(AirRolesGuard)
  async removeOne(
    @Param('id') responseId: string,
    @Headers('accept-language') lang: string,
  ): Promise<void> {
    try {
      await this.responseService.removeOne(responseId);
      return;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
