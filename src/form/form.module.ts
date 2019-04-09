import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { ConfigModule } from 'src/config/config.module';
import { formProviders } from './form.provider';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [ConfigModule, DBModule],
  controllers: [FormController],
  providers: [...formProviders, FormService],
})
export class FormModule {}
