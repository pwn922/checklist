import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MsQuestionnaireController } from './ms-questionnaire.controller';
import { MsQuestionnaireService } from './ms-questionnaire.service';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE_MSQUESTIONNAIRE'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'ms-auth',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_HOST'),
            port: configService.get<number>('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    QuestionnaireModule,
    AnswersModule,
  ],
  controllers: [MsQuestionnaireController],
  providers: [MsQuestionnaireService],
})
export class MsQuestionnaireModule {}
