import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PardjsUsersServiceSdkModule } from '@pardjs/users-service-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { EnvModule } from './env';
import { ResponseModule } from './response';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRoot(),
    ResponseModule,
    ConfigModule,
    PardjsUsersServiceSdkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
