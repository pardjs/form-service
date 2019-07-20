import { config } from 'dotenv';
config();

import * as Sentry from '@sentry/node';
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    serverName: process.env.SERVICE_NAME || 'pardjs-form-service',
  });
}

import { start as startApm } from 'elastic-apm-node';
if (process.env.ELASTIC_APM_SERVER_URL) {
  startApm({
    serviceName: process.env.SERVICE_NAME || 'pardjs-form-service',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  });
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import {
  corsOptions,
  HttpExceptionFilter,
  logger,
  ValidationPipe,
} from '@pardjs/common';

import { readFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { ProjectConfig } from './interfaces/project-config.interface';

const projectConfig: ProjectConfig = JSON.parse(
  readFileSync(join(process.cwd(), 'project-config.json')).toString(),
);
logger.info('project config', { projectConfig });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('Pardjs Form Service')
    .setDescription('The form service of Pardjs')
    .setContactEmail('contact@dozto.com')
    .setVersion(projectConfig.apiVersion)
    .setBasePath((process.env.SERVICE_BASE || '') + '/api')
    .addTag('FormService')
    .setSchemes('http', 'https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const docPath = process.env.SERVICE_BASE
    ? `${process.env.SERVICE_BASE}-api-doc`
    : '/api-doc';
  SwaggerModule.setup(docPath, app, document);
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
