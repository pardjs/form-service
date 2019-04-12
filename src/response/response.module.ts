import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseController, ResponseService, ResponseEntity } from '.';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ResponseEntity])],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
