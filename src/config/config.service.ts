import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { registerSchema, ValidationSchema } from 'class-validator';
import Hashids from 'hashids';

import { logger } from '@pardjs/common';

import { EnvService } from '../env';
import { UpsertConfigDto } from './dto';
import { ConfigEntity, ERRORS } from '.';
import { ResponseEntity } from 'src/response';

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

  async create(data: UpsertConfigDto): Promise<ConfigEntity> {
    try {
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
          // FIXME: 从service里移除http相关内容
          throw new BadRequestException(
            ERRORS.INVALID_RESPONSE_VALIDATE_SCHEMA,
          );
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
    } catch (error) {
      logger.error('Failed to create config', { error });
      throw error;
    }
  }

  async update(configId: string, data: UpsertConfigDto): Promise<ConfigEntity> {
    try {
      await this.configRepository.update(configId, data);
      return this.configRepository.findOne(configId);
    } catch (error) {
      logger.error('Failed to find config', { error });
      throw error;
    }
  }

  async find(option: FindManyOptions): Promise<ConfigEntity[]> {
    try {
      return await this.configRepository.find(option);
    } catch (error) {
      logger.error('Failed to find  config', { error });
      throw error;
    }
  }

  async findOne(configId: string): Promise<ConfigEntity> {
    try {
      return await this.configRepository.findOne(configId);
    } catch (error) {
      logger.error('Failed to find one config', { error });
      throw error;
    }
  }

  async findOneByHash(hashId: string): Promise<ConfigEntity> {
    try {
      return await this.configRepository.findOne({ hashId });
    } catch (error) {
      logger.error('Failed to find one config by hashId', { error });
      throw error;
    }
  }

  async remove(configId: string): Promise<void> {
    try {
      await this.configRepository.delete(configId);
      return;
    } catch (error) {
      logger.error('Failed to remove config', { error });
      throw error;
    }
  }

  // TODO: pagination
  async findResponses(configId: string): Promise<ConfigEntity[]> {
    return await this.configRepository.find({
      relations: ['responses'],
    });
  }
}
