import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(helmet());
  app.setGlobalPrefix('api/v1.0');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    exposedHeaders: [
      'X-Total-Count',
    ],
  });

  await app.listen(3000);
}
bootstrap();
