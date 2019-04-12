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
import { ClientService, ClientEntity } from '.';
import { CreateClientDto } from './dtos/create-client.dto';
import { CreateClientResDto } from './dtos/create-client-res.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { UpdateClientResDto } from './dtos/update-client-res.dto';
import { FindAllClientResDto } from './dtos/findall-client-res.dto';
import { ErrorResDto } from './dtos/error-res.dot';

@Controller('api')
@ApiUseTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/clients')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ClientEntity,
  })
  async create(
    @Body() data: CreateClientDto,
  ): Promise<ClientEntity | ErrorResDto> {
    return await this.clientService.create(data);
  }

  @Put('/clients/:id')
  async update(
    @Param('id') clientId: string,
    @Body() data: UpdateClientDto,
  ): Promise<UpdateClientResDto> {
    return {};
  }

  @Get('clients')
  async findAll(): Promise<FindAllClientResDto> {
    return {};
  }

  @Get('clients/:id')
  async find(): Promise<FindAllClientResDto> {
    return {};
  }

  @Delete('clients/:id')
  async delete(): Promise<void | ErrorResDto> {
    return;
  }
}
