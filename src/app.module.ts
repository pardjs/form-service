import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
