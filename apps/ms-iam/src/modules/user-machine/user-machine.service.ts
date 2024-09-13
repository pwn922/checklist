import { Injectable } from '@nestjs/common';
import { CreateUserMachineDto } from './dto/create-user-machine.dto';
import { UpdateUserMachineDto } from './dto/update-user-machine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserMachine } from './schemas/user-machine.schema';
import { Model } from 'mongoose';
import { mongoErrorHandler } from '../../utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class UserMachineService {
  constructor(@InjectModel(UserMachine.name) private userModel: Model<UserMachine>) {}
  async create(createUserDto: CreateUserMachineDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  findAll() {
    return `This action returns all userMachine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMachine`;
  }

  update(id: number, updateUserMachineDto: UpdateUserMachineDto) {
    return `This action updates a #${id} userMachine`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMachine`;
  }
}
