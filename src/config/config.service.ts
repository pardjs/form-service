import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { registerSchema, ValidationSchema } from 'class-validator';
import Hashids from 'hashids';
import { FindManyOptions, Repository } from 'typeorm';
import { ConfigEntity } from '../config/config.entity';
import { EnvService } from '../env';
import { ResponseService } from '../response';
import { ResponseEntity } from '../response/response.entity';
import { ERRORS } from './config.errors';
import { UpsertConfigDto } from './dto';

@Injectable()
export class ConfigService {
  // FIXME: get secret from process env
  private hashids = new Hashids('S3CR3T_T0K3II');

  constructor(
    config: EnvService,
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>, //
    private readonly responseService: ResponseService,
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
          // FIXME: 从service里移除http相关内容 ERRORS.INVALID_RESPONSE_VALIDATE_SCHEMA
          throw new Error(
            ERRORS.INVALID_RESPONSE_VALIDATE_SCHEMA.message['zh-CN'],
          );
        }
      }

      const config: ConfigEntity = await this.configRepository.save(data);
      config.hashId = this.hashids.encode(
        ...config.id
          .toString()
          .split('')
          .map(item => Number(item)),
      );
      return this.configRepository.save(config);
    } catch (error) {
      logger.error('Failed to create config', { error });
      throw error;
    }
  }

  async replaceOne(
    configId: string,
    data: UpsertConfigDto,
  ): Promise<ConfigEntity> {
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

  async removeOne(configId: string): Promise<void> {
    try {
      await this.configRepository.delete(configId);
      return;
    } catch (error) {
      logger.error('Failed to remove config', { error });
      throw error;
    }
  }

  async findResponses(
    configId: number,
    params: any,
  ): Promise<{ data: ResponseEntity[]; total: number }> {
    return this.responseService.queryByConfigId(configId, params);
  }
}
