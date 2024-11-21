import { IsNotEmpty, IsArray, ValidateNested, IsOptional, IsMongoId, IsString, isNumberString, IsNumberString } from 'class-validator';
import { CreateSectionDto } from '../../section/dto/create-section.dto';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class CreateQuestionnaireDto {
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections!: CreateSectionDto[];

  @IsOptional()
  userId?: string;

  @IsOptional()
  machineId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  photos!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}