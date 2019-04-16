import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe, HttpExceptionFilter } from '@pardjs/common';

import { AppModule } from './app.module';
import * as VERSION from '../version.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Pardjs Form Service')
    .setDescription('The form service of Pardjs')
    .setContactEmail('contact@dozto.com')
    .setVersion(VERSION.api)
    .addTag('FormService')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  // 使用通用的数据验证 pipe
  app.useGlobalPipes(new ValidationPipe());
  // 使用通用的错误处理
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
