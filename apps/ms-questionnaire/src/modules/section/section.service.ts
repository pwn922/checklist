import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { MongoError } from 'mongodb';
import { Section } from './entities/section.entity';
import { mongoErrorHandler } from '@app/common';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
  ) {}
  async create(createSectionDto: CreateSectionDto) {
    try {
      return await this.sectionModel.create(createSectionDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.sectionModel.find().exec();
  }

  async findOne(id: string) {
    return await this.sectionModel.findById(id).exec();
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    try {
      return await this.sectionModel
        .updateOne({ _id: id }, updateSectionDto)
        .exec();
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.sectionModel.deleteOne({ _id: id }).exec();
  }
}
