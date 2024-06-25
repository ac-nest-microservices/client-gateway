import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { config } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(config.port);

  logger.log(`Gateway is running on port ${config.port}`);
}
bootstrap();
