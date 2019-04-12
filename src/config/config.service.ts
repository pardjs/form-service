import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dtos/create-client.dto';
import { ErrorResDto } from './dtos/error-res.dot';
import { EnvService } from 'src/env';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { ConfigEntity } from '.';
import { logger } from '@pardjs/common';
import Hashids from 'hashids';
import { registerSchema, ValidationSchema, validate } from 'class-validator';
import { ERRORS } from './config.errors';
import { SCHEMAS } from './config.schemas';

@Injectable()
export class ConfigService {
  // FIXME: get secret from process env
  private hashids = new Hashids('S3CR3T_T0K3II');

  constructor(
    config: EnvService,
    @InjectRepository(ConfigEntity)
    private readonly clientRepository: Repository<ConfigEntity>,
  ) {
    // TODO: 拆分到common
    // // 注册schema
    // for (const schema of SCHEMAS) {
    //   logger.info('>>> reg', schema);
    //   registerSchema(schema);
    // }
  }

  async create(data: CreateClientDto): Promise<ConfigEntity | ErrorResDto> {
    // TODO: 拆分到common
    // const errors = await validate('CREATE_CLIENT_SCHEMA', data);
    // if (errors.length > 0) {
    //   console.log('Validate error', { errors: JSON.stringify(errors) });
    //   throw new BadRequestException();
    // }

    if (data.responseSchema) {
      // 验证表单的校验Schema是否正确
      try {
        registerSchema(data.responseSchema as ValidationSchema);
      } catch (error) {
        logger.info('error', error);
        throw new BadRequestException(ERRORS.INVALID_RESPONSE_VALIDATE_SCHEMA);
      }
    }

    const client: ConfigEntity = await this.clientRepository.save(data);

    // TODO: Improve, use triggered beforeInsert auto inject the hashId
    await this.clientRepository.update(client.id, {
      hashId: this.hashids.encode(
        ...String(client.id)
          .split('')
          .map(item => Number(item)),
      ),
    });

    return await this.clientRepository.findOne(client.id);
  }
}
