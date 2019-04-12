import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env';
import { ResponseModule } from './response';
import { ConfigModule } from './config';

@Module({
  imports: [EnvModule, TypeOrmModule.forRoot(), ResponseModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
