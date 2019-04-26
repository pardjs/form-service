import {
  Controller,
  Body,
  Post,
  Headers,
  Get,
  HttpStatus,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';

import { UpsertConfigDto, ConfigResDto } from './dto';
import { ConfigService } from '.';
import { httpErrorHandler } from '../uilts';
import { ResponseResDto } from '../response/dto';

@Controller('configs')
@ApiUseTags('Config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ConfigResDto,
  })
  async create(
    @Body() data: UpsertConfigDto,
    @Headers('Accept-Language') lang: string,
  ): Promise<ConfigResDto> {
    try {
      const config = await this.configService.create(data);
      return config;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ConfigResDto,
  })
  async replaceOne(
    @Param('id') configId: string,
    @Body() data: UpsertConfigDto,
    @Headers('Accept-Language') lang: string,
  ): Promise<ConfigResDto> {
    try {
      return await this.configService.replaceOne(configId, data);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: [ConfigResDto],
  })
  async find(
    @Param() option: FindManyOptions,
    @Headers('Accept-Language') lang: string,
  ): Promise<ConfigResDto[]> {
    try {
      return await this.configService.find(option);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ConfigResDto],
  })
  async findOne(
    @Param('id') configId: string,
    @Headers('Accept-Language') lang: string,
  ): Promise<ConfigResDto> {
    try {
      return await this.configService.findOne(configId);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async removeOne(
    @Param('id') configId: string,
    @Headers('Accept-Language') lang: string,
  ): Promise<void> {
    try {
      await this.configService.removeOne(configId);
      return;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Get(':id/responses')
  async findResponses(
    @Param('id') configId: number,
    @Query() query: any,
    @Headers('Accept-Language') lang: string,
  ): Promise<[ResponseResDto[], number]> {
    try {
      return await this.configService.findResponses(configId, query);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
