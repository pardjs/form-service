import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseController, ResponseService, ResponseEntity } from '.';
import { EnvModule } from 'src/env';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]), EnvModule],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
