import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '../env';
import { ResponseController, ResponseService, ResponseEntity } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]), EnvModule],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
