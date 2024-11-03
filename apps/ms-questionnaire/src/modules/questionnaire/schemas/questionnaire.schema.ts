import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Section } from '../../section/entities/section.entity';

@Schema({ timestamps: true })
export class Questionnaire extends Document {
  @Prop({ required: true })
  title?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Section' }] })
  sections!: Section[];

  @Prop({ required: false })
  isCompleted?: boolean;
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