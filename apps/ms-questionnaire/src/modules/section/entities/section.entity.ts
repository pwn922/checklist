import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Section extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions!: Types.ObjectId[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);