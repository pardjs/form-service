import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '../env';

import { ConfigController, ConfigService, ConfigEntity } from '.';

@Module({
  imports: [EnvModule, TypeOrmModule.forFeature([ConfigEntity])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
