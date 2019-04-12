import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dtos/create-client.dto';
import { ErrorResDto } from './dtos/error-res.dot';
import { ConfigService } from 'src/config/config.service';
import { Repository } from 'typeorm';
import { ClientEntity } from '.';

@Injectable()
export class ClientService {
  constructor(
    config: ConfigService,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(data: CreateClientDto): Promise<ClientEntity | ErrorResDto> {
    const res: ClientEntity = await this.clientRepository.save(data);
    return res;
  }
}
