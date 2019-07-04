import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from '../env';
import { ResponseModule } from '../response';
import { ResponseService } from '../response';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';
import { ConfigService } from './config.service';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forFeature([ConfigEntity]),
    forwardRef(() => ResponseModule),
  ],
  controllers: [ConfigController],
  providers: [ConfigService, ResponseService],
})
export class ConfigModule {}
