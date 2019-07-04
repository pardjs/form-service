import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigController, ConfigEntity, ConfigService } from '.';
import { EnvModule } from '../env';
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
