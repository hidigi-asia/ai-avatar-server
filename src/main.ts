import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ApiModule } from './api/api.module';
import { RemotionModule } from './remotion/remotion.module';

async function bootstrap() {
  const apiServer = await NestFactory.create(ApiModule);
  const remotionServer = await NestFactory.create(RemotionModule);

  apiServer.use(morgan('dev'));
  remotionServer.use(morgan('dev'));

  apiServer.setGlobalPrefix('api');

  apiServer.enableCors();
  remotionServer.enableCors();

  apiServer.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(apiServer, config);
  SwaggerModule.setup('api', apiServer, document);

  await apiServer.listen(3000);
  await remotionServer.listen(3001);
}

bootstrap();
