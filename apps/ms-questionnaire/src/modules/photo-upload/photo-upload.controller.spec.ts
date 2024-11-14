import { Test, TestingModule } from '@nestjs/testing';
import { PhotoUploadController } from './photo-upload.controller';
import { PhotoUploadService } from './photo-upload.service';

describe('PhotoUploadController', () => {
  let controller: PhotoUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoUploadController],
      providers: [PhotoUploadService],
    }).compile();

    controller = module.get<PhotoUploadController>(PhotoUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
