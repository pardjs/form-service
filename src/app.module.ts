import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

import { ResponseModule } from './response';
import { ClientModule } from './client';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    ResponseModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
