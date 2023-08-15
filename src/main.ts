import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The  API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  // app.useGlobalFilters(new CustomExceptionFilter());


  await app.listen(3000);
}
bootstrap();
function addBearerAuth() {
  throw new Error('Function not implemented.');
}

