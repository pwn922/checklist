import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './schemas/machine.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { mongoErrorHandler } from '@app/common';
import { MongoError } from 'mongodb';
import { AreaService } from '../area/area.service';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine.name) private machineModel: Model<Machine>,
    private readonly areaService: AreaService,
  ) {}

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

  async findOne(id: string) {
    return await this.machineModel.findById(id).exec();
  }

  async update(id: string, updateMachineDto: UpdateMachineDto) {
    try {
      return await this.machineModel.updateOne({ _id: id }, updateMachineDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.machineModel.deleteOne({ _id: id });
  }

  async getMachinesByAreaId(areaId: string) {
    try {
      if (!Types.ObjectId.isValid(areaId)) {
        throw new Error('Invalid area ID');
      }

      const area = await this.areaService.findOne(areaId);
      if (!area) {
        throw new Error('The area does not exist');
      }
      return await this.machineModel.find({ areaId: areaId });
    } catch (error) {
      if ((error as Record<string, number>)?.code) {
        mongoErrorHandler(error as MongoError);
      }
      throw new Error(error as string);
    }
  }
}