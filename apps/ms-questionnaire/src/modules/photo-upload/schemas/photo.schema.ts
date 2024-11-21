import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Photo extends Document {
  @Prop({ required: true })
  filenamePath!: string;

  @Prop({ required: true })
  mimeType!: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);