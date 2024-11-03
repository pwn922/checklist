import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Machine extends Document {
  @Prop({ type: String, required: true, unique: true })
  patente?: string;

  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String, required: true })
  modelo?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Area', required: true })
  areaId?: MongooseSchema.Types.ObjectId;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);