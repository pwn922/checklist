import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ required: true })
  content!: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);