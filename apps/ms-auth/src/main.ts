import { NestFactory, Reflector } from '@nestjs/core';
import { MsAuthModule } from './ms-auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MsAuthModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
