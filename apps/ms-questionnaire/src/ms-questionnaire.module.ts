import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MsQuestionnaireController } from './ms-questionnaire.controller';
import { MsQuestionnaireService } from './ms-questionnaire.service';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI_2'),
        dbName: configService.get<string>('MONGODB_DATABASE_2'),
      }),
    }),
    QuestionnaireModule,
    AnswersModule,
  ],
  controllers: [MsQuestionnaireController],
  providers: [MsQuestionnaireService],
})
export class MsQuestionnaireModule {}