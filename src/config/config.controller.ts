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
import { ConfigService, ERRORS } from '.';
import { FindManyOptions } from 'typeorm';

@Controller('api/configs')
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
  ): Promise<ConfigResDto | HttpException> {
    try {
      const config = await this.configService.create(data);
      return config;
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ConfigResDto,
  })
  async update(
    @Param('id') configId: string,
    @Body() data: UpsertConfigDto,
  ): Promise<ConfigResDto | HttpException> {
    try {
      return await this.configService.update(configId, data);
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ConfigResDto],
  })
  async find(
    @Param() option: FindManyOptions,
  ): Promise<ConfigResDto[] | HttpException> {
    try {
      return await this.configService.find(option);
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ConfigResDto],
  })
  async findOne(
    @Param('id') configId: string,
  ): Promise<ConfigResDto | HttpException> {
    try {
      return await this.configService.findOne(configId);
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async remove(@Param('id') configId: string): Promise<void | HttpException> {
    try {
      await this.configService.remove(configId);
      return;
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }

  // TODO: Internal requests.
  @Get(':id/responses')
  async getResponses(
    @Param('id') configId: string,
  ): Promise<ConfigResDto[] | HttpException> {
    try {
      return await this.configService.findResponses(configId);
    } catch (error) {
      return new InternalServerErrorException(
        ERRORS.UNEXPECTED_ERROR,
        error.message,
      );
    }
  }
}
