import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Machine } from '../../machine/schemas/machine.schema';

@Schema()
export class UserMachine extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    User?: mongoose.Types.ObjectId;

 @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Machine" })
  Machine?: Machine;
}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);