import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  observation!: string;

  @Prop({ required: true, enum: ['multiple-choice', 'short-answer', 'single-choice'] })
  type!: string;

  @Prop({ type: Types.ObjectId, ref: 'Questionnaire' })
  questionnaireId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Answer' }] })
  answers?: Types.ObjectId[];

  @Prop({ required: false })
  position!: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);