import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export interface IUser {
  id?: string,
  name?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: number;
  address?: string;
  addressAdditional?: string;
  active?: boolean;
  areaId: MongooseSchema.Types.ObjectId;
}

@Schema()
export class User extends Document implements IUser {
  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String, required: true })
  lastName?: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: Number })
  phone?: number;

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