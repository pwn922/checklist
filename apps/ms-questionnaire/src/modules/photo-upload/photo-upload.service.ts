import { Injectable } from '@nestjs/common';
import { CreatePhotoUploadDto } from './dto/create-photo-upload.dto';
import { UpdatePhotoUploadDto } from './dto/update-photo-upload.dto';
import { createFile, getFileBase64 } from '@app/common';
import { Photo } from './schemas/photo.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';


@Injectable()
export class PhotoUploadService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<Photo>,
  ) {}

  async create(createPhotoUploadDto: CreatePhotoUploadDto) {
    const buffer = Buffer.from(createPhotoUploadDto.base64Photo, 'base64');
    const crypto = require("crypto");
    const stringRandom = crypto.randomBytes(16).toString("hex");
    const path = "./photos"
    const filename = stringRandom + "-" + createPhotoUploadDto.filenameOriginal;
    await createFile(path, filename, buffer)
    const filenamePath = path + "/" + filename;
    const newPhoto = {
      filenamePath: filenamePath,
      type: createPhotoUploadDto.type
    }

    return await this.photoModel.create(newPhoto)
  }

  async findAll() {
    return `This action returns all photoUpload`;
  }

  async findOne(id: string) {
    const PHOTO_NOT_FOUND = "Photo not found."
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return PHOTO_NOT_FOUND
    }

    const photoFound = await this.photoModel.findById(id)
    if (!photoFound) {
      return PHOTO_NOT_FOUND
    }

    const filenamePath = photoFound.filenamePath;
    const base64Photo = await getFileBase64(filenamePath);

    return {
      base64Photo
    };
  }

  async update(id: string, updatePhotoUploadDto: UpdatePhotoUploadDto) {
    return `This action updates a #${id} photoUpload`;
  }

  async remove(id: string) {
    return `This action removes a #${id} photoUpload`;
  }
}
