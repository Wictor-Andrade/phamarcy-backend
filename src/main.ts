import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('phamarcy/v1');

  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('cookie.secret');
  if (!cookieSecret) throw new Error('Missing cookie.secret config');
  const port = configService.get('port') || 4000;

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('A barateira docs')
    .setDescription('A barateira api documentation')
    .setVersion('1.0')
    .addTag('abarateira')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));

  app.use(compression());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.use(cookieParser(cookieSecret));

  const host = '0.0.0.0';

  await app.listen(port, host);
  Logger.log(`Swagger running on https://${host}:${port}/docs`, 'Bootstrap');
  Logger.log(
    `Application is running on: https://${host}:${port}/phamarcy/v1`,
    'Bootstrap',
  );
}

bootstrap();
