import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { config } from 'dotenv';
config();

import {
  ValidationPipe,
  HttpExceptionFilter,
  corsOptions,
} from '@pardjs/common';

import { AppModule } from './app.module';
import * as VERSION from '../version.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('Pardjs Form Service')
    .setDescription('The form service of Pardjs')
    .setContactEmail('contact@dozto.com')
    .setVersion(VERSION.api)
    .setBasePath(process.env.SERVICE_BASE + '/api')
    .addTag('FormService')
    .setSchemes('http', 'https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/form-service-api-doc', app, document);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  // 使用通用的数据验证 pipe
  app.useGlobalPipes(new ValidationPipe());
  // 使用通用的错误处理
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
