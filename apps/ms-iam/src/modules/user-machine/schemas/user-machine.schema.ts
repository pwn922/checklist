import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Machine } from '../../machine/schemas/machine.schema';

@Schema()
export class UserMachine extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    User?:User;

 @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Machine" })
  Machine?:Machine;

  
  

  
}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);