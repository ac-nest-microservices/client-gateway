import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { config } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.port);

  logger.log(`Gateway is running on port ${config.port}`);
}
bootstrap();
