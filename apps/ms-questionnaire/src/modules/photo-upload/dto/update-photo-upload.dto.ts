import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoUploadDto } from './create-photo-upload.dto';

export class UpdatePhotoUploadDto extends PartialType(CreatePhotoUploadDto) {}
