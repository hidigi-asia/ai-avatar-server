import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const apiServer = await NestFactory.create(ApiModule);

  apiServer.use(morgan('dev'));

  apiServer.setGlobalPrefix('api');

  apiServer.enableCors();

  apiServer.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(apiServer, config);
  SwaggerModule.setup('api', apiServer, document);

  await apiServer.listen(3000);
}

bootstrap();
