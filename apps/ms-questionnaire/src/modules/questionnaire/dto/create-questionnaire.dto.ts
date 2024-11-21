import { IsNotEmpty, IsArray, ValidateNested, IsOptional, IsMongoId, IsString } from 'class-validator';
import { CreateSectionDto } from '../../section/dto/create-section.dto';
import { Type } from 'class-transformer';

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

export class LocationDto {
  @IsString()
  @IsOptional()
  latitude?: string;

  @IsString()
  @IsOptional()
  longitude?: string;
}