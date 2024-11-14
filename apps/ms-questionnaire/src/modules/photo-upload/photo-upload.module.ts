import { Module } from '@nestjs/common';
import { PhotoUploadService } from './photo-upload.service';
import { PhotoUploadController } from './photo-upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.registerAsync({
    useFactory: () => ({
      dest: './photos',
    }),
  })],
  controllers: [PhotoUploadController],
  providers: [PhotoUploadService],
})
export class PhotoUploadModule {}
