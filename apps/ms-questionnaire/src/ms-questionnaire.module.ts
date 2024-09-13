import { Module } from '@nestjs/common';
import { MsQuestionnaireController } from './ms-questionnaire.controller';
import { MsQuestionnaireService } from './ms-questionnaire.service';

@Module({
  imports: [],
  controllers: [MsQuestionnaireController],
  providers: [MsQuestionnaireService],
})
export class MsQuestionnaireModule {}
