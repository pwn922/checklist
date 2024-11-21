import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Section } from '../../section/entities/section.entity';
import { Photo } from '../../photo-upload/schemas/photo.schema';

@Schema({ timestamps: true })
export class Questionnaire extends Document {
  @Prop({ required: true })
  title?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Section' }], required: false })
  sections?: Section[];

  @Prop({ required: false })
  isCompleted?: boolean;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId }) 
  userId?: MongooseSchema.Types.ObjectId; 
  
  @Prop({ required: false, type: MongooseSchema.Types.ObjectId }) 
  machineId?: MongooseSchema.Types.ObjectId

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Photo' }], required: false, default: undefined  })
  photos?: Photo[]

  @Prop({
    type: {
      latitude: { type: String },
      longitude: { type: String },
    },
    required: false,
  })
  location?: { latitude: string; longitude: string };
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);

QuestionnaireSchema.pre('findOneAndDelete', async function (next) {
  const questionnaire = await this.model.findOne<Questionnaire>(this.getQuery());
  if (questionnaire && questionnaire.sections) {
    const SectionModel = this.model.db.model('Section');
    await SectionModel.deleteMany( { _id: { $in: questionnaire.sections } });
  }

  next();
});