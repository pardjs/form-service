import { FormServiceAuthPoints } from './../auth-points';
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
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';

import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';

import { UpsertConfigDto, ConfigResDto } from './dto';
import { ConfigService } from '.';
import { httpErrorHandler } from '../utils';
import { ResponseResDto } from '../response/dto';
import { ResponseEntity } from '../response';

@Controller('configs')
@ApiUseTags('Config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ConfigResDto,
  })
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.CREATE_CONFIG)
  @UseGuards(AirRolesGuard)
  async create(
    @Body() data: UpsertConfigDto,
    @Headers('Accept-Language') lang?: string,
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
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.REPLACE_CONFIG)
  @UseGuards(AirRolesGuard)
  async replaceOne(
    @Param('id') configId: string,
    @Body() data: UpsertConfigDto,
    @Headers('Accept-Language') lang?: string,
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
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.FIND_CONFIGS)
  @UseGuards(AirRolesGuard)
  async find(
    @Param() option: FindManyOptions,
    @Headers('Accept-Language') lang?: string,
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
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.FIND_ONE_CONFIG)
  @UseGuards(AirRolesGuard)
  async findOne(
    @Param('id') configId: string,
    @Headers('Accept-Language') lang?: string,
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
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.REMOVE_CONFIG)
  @UseGuards(AirRolesGuard)
  async removeOne(
    @Param('id') configId: string,
    @Headers('Accept-Language') lang?: string,
  ): Promise<void> {
    try {
      await this.configService.removeOne(configId);
      return;
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }

  @Get(':id/responses')
  @ApiBearerAuth()
  @AuthPointName(FormServiceAuthPoints.FIND_CONFIG_RESPONSES)
  @UseGuards(AirRolesGuard)
  async findResponses(
    @Param('id') configId: number,
    @Query() query?: FindManyOptions<ResponseEntity>,
    @Headers('Accept-Language') lang?: string,
  ): Promise<{ data: ResponseResDto[]; total: number }> {
    try {
      return await this.configService.findResponses(configId, query);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
