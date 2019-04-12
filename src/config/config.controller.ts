import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  Param,
  Put,
  Delete,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { UpsertConfigDto, ConfigResDto } from './dto';
import { ConfigService, ConfigEntity } from '.';
import { FindManyOptions } from 'typeorm';

@Controller('api')
@ApiUseTags('Config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/configs')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ConfigEntity,
  })
  async create(
    @Body() data: UpsertConfigDto,
  ): Promise<ConfigResDto | HttpException> {
    try {
      const config = await this.configService.create(data);
      return config;
    } catch (error) {
      return new InternalServerErrorException(
        'Internal error when find config',
        error,
      );
    }
  }

  @Put('/configs/:id')
  async update(
    @Param('id') configId: string,
    @Body() data: UpsertConfigDto,
  ): Promise<ConfigResDto | HttpException> {
    try {
      return await this.configService.update(configId, data);
    } catch (error) {
      return new InternalServerErrorException(
        'Internal error when update config',
        error,
      );
    }
  }

  @Get('configs')
  async find(
    @Param() option: FindManyOptions,
  ): Promise<ConfigResDto[] | HttpException> {
    try {
      return await this.configService.find(option);
    } catch (error) {
      return new InternalServerErrorException(
        'Internal error when find config',
        error,
      );
    }
  }

  @Get('configs/:id')
  async findOne(
    @Param('id') configId: string,
  ): Promise<ConfigResDto | HttpException> {
    try {
      return await this.configService.findOne(configId);
    } catch (error) {
      return new InternalServerErrorException(
        'Internal error when find config',
        error,
      );
    }
  }

  @Delete('configs/:id')
  async remove(@Param('id') configId: string): Promise<void | HttpException> {
    try {
      await this.configService.remove(configId);
      return;
    } catch (error) {
      return new InternalServerErrorException(
        'Internal error when remove config',
        error,
      );
    }
  }
}
