import { NestFactory } from '@nestjs/core';
import { MsQuestionnaireModule } from './ms-questionnaire.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(MsQuestionnaireModule);
  app.useGlobalPipes(new ValidationPipe());
  // Configurar un límite más grande, por ejemplo, 50 MB
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(3002);
}
bootstrap();
