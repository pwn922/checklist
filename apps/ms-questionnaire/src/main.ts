import { NestFactory } from '@nestjs/core';
import { MsQuestionnaireModule } from './ms-questionnaire.module';

async function bootstrap() {
  const app = await NestFactory.create(MsQuestionnaireModule);
  await app.listen(3000);
}
bootstrap();
