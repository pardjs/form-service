import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { registerSchema, ValidationSchema, validate } from 'class-validator';
import Hashids from 'hashids';

import { logger } from '@pardjs/common';

import { EnvService } from '../env';
import { ErrorResDto, CreateConfigDto } from './dto';
import { ConfigEntity, ERRORS, SCHEMAS } from '.';

@Injectable()
export class ConfigService {
  // FIXME: get secret from process env
  private hashids = new Hashids('S3CR3T_T0K3II');

  constructor(
    config: EnvService,
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {
    // TODO: 拆分到common
    // // 注册schema
    // for (const schema of SCHEMAS) {
    //   logger.info('>>> reg', schema);
    //   registerSchema(schema);
    // }
  }

  async create(data: CreateConfigDto): Promise<ConfigEntity | ErrorResDto> {
    // TODO: 拆分到common
    // const errors = await validate('CREATE_CONFIG_SCHEMA', data);
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

    const config: ConfigEntity = await this.configRepository.save(data);

    // TODO: Improve, use triggered beforeInsert auto inject the hashId
    await this.configRepository.update(config.id, {
      hashId: this.hashids.encode(
        ...String(config.id)
          .split('')
          .map(item => Number(item)),
      ),
    });

    return await this.configRepository.findOne(config.id);
  }
}
