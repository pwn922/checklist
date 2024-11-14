import { Injectable } from '@nestjs/common';
import { CreatePhotoUploadDto } from './dto/create-photo-upload.dto';
import { UpdatePhotoUploadDto } from './dto/update-photo-upload.dto';

@Injectable()
export class PhotoUploadService {
  create(createPhotoUploadDto: CreatePhotoUploadDto) {
    return 'This action adds a new photoUpload';
  }

  findAll() {
    return `This action returns all photoUpload`;
  }

  findOne(id: string) {
    return `This action returns a #${id} photoUpload`;
  }

  update(id: string, updatePhotoUploadDto: UpdatePhotoUploadDto) {
    return `This action updates a #${id} photoUpload`;
  }

  remove(id: string) {
    return `This action removes a #${id} photoUpload`;
  }
}
