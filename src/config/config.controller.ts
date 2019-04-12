import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import {
  ErrorResDto,
  CreateConfigDto,
  CreateConfigResDto,
  UpdateConfigDto,
  UpdateConfigResDto,
  FindAllConfigResDto,
} from './dto';
import { ConfigService, ConfigEntity } from '.';

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
    @Body() data: CreateConfigDto,
  ): Promise<ConfigEntity | ErrorResDto> {
    return await this.configService.create(data);
  }

  @Put('/configs/:id')
  async update(
    @Param('id') configId: string,
    @Body() data: UpdateConfigDto,
  ): Promise<UpdateConfigResDto> {
    return {};
  }

  @Get('configs')
  async findAll(): Promise<FindAllConfigResDto> {
    return {};
  }

  @Get('configs/:id')
  async find(): Promise<FindAllConfigResDto> {
    return {};
  }

  @Delete('configs/:id')
  async delete(): Promise<void | ErrorResDto> {
    return;
  }
}
