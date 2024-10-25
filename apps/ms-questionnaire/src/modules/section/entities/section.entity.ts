import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Question } from '../../question/entity/question.entity';

@Schema({ timestamps: true })
export class Section extends Document {
  @Prop({ required: true })
  title!: string;
  

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Question' }] })
  questions!: Question[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);

SectionSchema.pre('deleteMany', async function (next) {
  const section = await this.model.findOne<Section>(this.getQuery());
  if (section && section.questions.length) {
    const QuestionModel = this.model.db.model('Question');
    await QuestionModel.deleteMany({ _id: { $in: section.questions } })
  }

  next();
});