import { NestFactory } from '@nestjs/core';
import { MsAuthModule } from './ms-auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MsAuthModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: configService.get<string>('AUTH_PORT'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();