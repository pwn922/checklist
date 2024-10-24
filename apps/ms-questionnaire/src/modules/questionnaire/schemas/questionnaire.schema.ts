import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Section } from '../../section/entities/section.entity';

@Schema({ timestamps: true })
export class Questionnaire extends Document {
  @Prop({ required: true })
  title?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Section' }] })
  sections!: Section[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);