import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './schemas/machine.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { mongoErrorHandler } from '../../utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine.name) private machineModel: Model<Machine>) {}

  async create(createMachineDto: CreateMachineDto) {
    try {
      return await this.machineModel.create(createMachineDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.machineModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} machine`;
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return `This action updates a #${id} machine`;
  }

  remove(id: number) {
    return `This action removes a #${id} machine`;
  }
}
