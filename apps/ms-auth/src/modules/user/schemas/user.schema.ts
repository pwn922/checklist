import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String, required: true })
  lastName?: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  addressAdditional?: string;

  @Prop({ default: true })
  active?: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  areaId!: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);