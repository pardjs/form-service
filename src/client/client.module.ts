import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';

import { ClientController, ClientService, ClientEntity } from '.';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
