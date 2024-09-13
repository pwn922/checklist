import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './schemas/area.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongoErrorHandler } from '../../utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}
  async create(createAreaDto: CreateAreaDto) {
    try {
      return await this.areaModel.create(createAreaDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  findAll() {
    return `This action returns all area`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

   async update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
