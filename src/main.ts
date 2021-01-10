import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { setupSwagger } from './common/dev/swagger';
import { AppConfig } from './common/providers/config/app.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(AppConfig);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.apiVersion);
  app.disable('x-powered-by');
  app.use(compression());
  if (config.isDevMode) {
    setupSwagger(app);
  }

  await app.listen(config.port);
  logger.verbose(`Server launched on port ${config.port}`);
}
bootstrap();
