import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class UserMachine extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  user?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Machine" })
  machine?: MongooseSchema.Types.ObjectId;
}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);