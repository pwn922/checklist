import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Answer } from '../../answer/schemas/answer.schema';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  observation!: string;

  /*
  @Prop({ required: true, enum: ['multiple-choice', 'short-answer', 'single-choice'] })
  type!: string;
  */
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }] })
  answers!: Answer[];

  /*
  @Prop({ required: false })
  position!: number;
  */
}

export const QuestionSchema = SchemaFactory.createForClass(Question);