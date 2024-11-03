import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { mongoErrorHandler } from '@app/common';
import { MongoError } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const createdUser = new this.userModel(createUserDto);

    try {
      return await createdUser.save();
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user: FilterQuery<User>): Promise<User | null> {
    return await this.userModel.findOne(user).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.deleteOne({ _id: id });
    return { deleted: result.deletedCount > 0 };
  }
}
