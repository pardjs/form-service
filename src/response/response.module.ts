import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseController, ResponseEntity, ResponseService } from '.';
import { ConfigEntity } from '../config/config.entity';
import { EnvModule } from '../env';

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
