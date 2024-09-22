import { NestFactory } from '@nestjs/core';
import { MsQuestionnaireModule } from './ms-questionnaire.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MsQuestionnaireModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
