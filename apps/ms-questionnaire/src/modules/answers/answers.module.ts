import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer, AnswerSchema } from './schemas/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
