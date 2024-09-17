import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ required: true })
  answerText?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);