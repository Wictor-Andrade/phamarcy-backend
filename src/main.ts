import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);

  app.setGlobalPrefix('phamarcy/v1');

  const host = '0.0.0.0';
  // const port = configService.get<number>('port') || 4000;
  const port = 4000;

  await app.listen(port, host);
  Logger.log(
    `Application is running on: https://${host}:${port}/phamarcy/v1`,
    'Bootstrap',
  );
}
bootstrap();
