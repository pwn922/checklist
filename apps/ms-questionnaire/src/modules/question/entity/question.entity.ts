import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Answer } from '../../answer/schemas/answer.schema';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  observation!: string;

  @Prop({ enum: ['multiple-choices', 'text-answer', 'single-choice'], required: true })
  type!: string;
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }] })
  answers!: Answer[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], required: false, default: undefined }) 
  userAnswer!: Answer[];

  

  //@Prop({ required: false })
  //userAnswerText!: Answer;

  //@Prop({ required: false })
  //userAnswerSingleChoice!: Answer;

  //@Prop({ required: false })
  //images!: undefined

  /*
  @Prop({ required: false }
  position!: number;
  */
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.pre('deleteMany', async function (next) {
  const question = await this.model.findOne<Question>(this.getQuery());

  if (question && question.answers.length) {
      const AnswerModel = this.model.db.model('Answer');
      await AnswerModel.deleteMany({ _id: { $in: question.answers } })
  }

  next();
});