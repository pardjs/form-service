import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '../env';
import { ResponseController, ResponseService, ResponseEntity } from '.';
import { ConfigEntity } from '../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResponseEntity, ConfigEntity]),
    EnvModule,
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
