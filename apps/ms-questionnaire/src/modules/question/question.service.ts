import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { MongoError } from 'mongodb';
import { mongoErrorHandler } from '@app/common';
import { Question } from './entity/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionModel.create(createQuestionDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.questionModel.find().exec();
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id).exec();
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      return await this.questionModel.updateOne({ _id: id }, updateQuestionDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.questionModel.deleteOne({ _id: id });
  }
}