import * as cookieParser from 'cookie-parser';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './infrastructure/common/interceptors/response.interceptor';

import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  // Security
  app.enableCors();

  // Filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Cookie
  app.use(cookieParser());

  // Prefix
  app.setGlobalPrefix('api');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
