import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ApiModule } from './api/api.module';
import { RemotionModule } from './remotion/remotion.module';

async function initializeApiServer() {
  const app = await NestFactory.create(ApiModule);

  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log('API server started on port 3000');

  return app;
}

async function initializeRemotionServer() {
  const app = await NestFactory.create(RemotionModule);

  app.use(morgan('dev'));

  app.enableCors();

  await app.listen(3001);

  console.log('Remotion server started on port 3001');

  return app;
}

async function bootstrap() {
  await initializeApiServer();
  await initializeRemotionServer();
}

bootstrap();
