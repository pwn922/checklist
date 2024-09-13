import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String, required: true })
  lastName?: string;

  @Prop({ type: String, required: true, unique: true })
  email?: string;

  @Prop({ type: String, required: true })
  password?: string;

  @Prop({ type: Number })
  phone?: number;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  addressAdditional?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company'})
  company?: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User);
