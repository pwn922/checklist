import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Questionnaire extends Document {
  @Prop({ required: true })
  title?: string;

  @Prop({ required: true })
  type?: string

  @Prop({ required: true })
  description?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Section' }] })
  sections!: Types.ObjectId[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);