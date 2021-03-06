import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from '@pardjs/users-service-sdk';
import { FindManyOptions } from 'typeorm';
import { FormServiceAuthPoints } from '../auth-points';
import { ResponseResDto } from '../response/dto';
import { httpErrorHandler } from '../utils';
import { ConfigService } from './config.service';
import { ConfigResDto, QueryDto, UpsertConfigDto } from './dto';

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
    @Headers('accept-language') lang?: string,
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
    @Headers('accept-language') lang?: string,
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
    @Headers('accept-language') lang?: string,
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
    @Headers('accept-language') lang?: string,
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
    @Headers('accept-language') lang?: string,
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
    @Query() query?: QueryDto,
    @Headers('accept-language') lang?: string,
  ): Promise<{ data: ResponseResDto[]; total: number }> {
    try {
      return await this.configService.findResponses(configId, query);
    } catch (error) {
      httpErrorHandler(error, lang);
    }
  }
}
