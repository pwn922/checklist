import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './schemas/answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongoErrorHandler } from '@app/common';
import { MongoError } from 'mongodb';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  async create(createAnswerDto: CreateAnswerDto) {
    try {
      return await this.answerModel.create(createAnswerDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.answerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.answerModel.findById(id).exec();
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    try {
      return await this.answerModel.updateOne({ _id: id }, updateAnswerDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.answerModel.deleteOne({ _id: id });
  }
}
