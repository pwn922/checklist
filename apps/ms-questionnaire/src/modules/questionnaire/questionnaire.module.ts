import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { Questionnaire, QuestionnaireSchema } from './schemas/questionnaire.schema';
import { SectionService } from '../section/section.service';
import { AnswerService } from '../answer/answer.service';
import { QuestionService } from '../question/question.service';
import { Section, SectionSchema } from '../section/entities/section.entity';
import { Question, QuestionSchema } from '../question/entity/question.entity';
import { Answer, AnswerSchema } from '../answer/schemas/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
      { name: Section.name, schema: SectionSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
    ]),
  ],
  controllers: [QuestionnaireController],
  providers: [
    QuestionnaireService,
    SectionService,
    QuestionService,
    AnswerService,
  ],
})
export class QuestionnaireModule {}
