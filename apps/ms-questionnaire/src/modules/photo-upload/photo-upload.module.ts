import { Module } from '@nestjs/common';
import { PhotoUploadService } from './photo-upload.service';
import { PhotoUploadController } from './photo-upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './schemas/photo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
  ],
  controllers: [PhotoUploadController],
  providers: [PhotoUploadService],
})
export class PhotoUploadModule {}
