import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from './env';
import { ResponseModule } from './response';
import { ConfigModule } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule, TypeOrmModule.forRoot(), ResponseModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
