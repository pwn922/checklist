import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswersModule {}
