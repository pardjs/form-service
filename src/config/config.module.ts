import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from 'src/env';

import { ClientController, ConfigService, ConfigEntity } from '.';

@Module({
  imports: [EnvModule, TypeOrmModule.forFeature([ConfigEntity])],
  controllers: [ClientController],
  providers: [ConfigService],
})
export class ConfigModule {}
