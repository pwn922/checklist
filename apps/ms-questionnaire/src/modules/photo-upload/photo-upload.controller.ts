import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { PhotoUploadService } from './photo-upload.service';
import { CreatePhotoUploadDto } from './dto/create-photo-upload.dto';
import { UpdatePhotoUploadDto } from './dto/update-photo-upload.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '@app/common';

@Controller('photo-upload')
export class PhotoUploadController {
  constructor(private readonly photoUploadService: PhotoUploadService) {}

  @Post()
  create(@Body() createPhotoUploadDto: CreatePhotoUploadDto) {
    return this.photoUploadService.create(createPhotoUploadDto);
  }

  @Get()
  findAll() {
    return this.photoUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoUploadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoUploadDto: UpdatePhotoUploadDto) {
    return this.photoUploadService.update(id, updatePhotoUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoUploadService.remove(id);
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('photos'))
  uploadFile(@UploadedFiles(new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'jpeg|jpg|png',
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) files: Array<Express.Multer.File>) {
    console.log(files);
  }
}