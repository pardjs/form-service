import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '../env';

import { ConfigController, ConfigService, ConfigEntity } from '.';
import { ResponseModule } from '../response';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forFeature([ConfigEntity]),
    forwardRef(() => ResponseModule),
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
