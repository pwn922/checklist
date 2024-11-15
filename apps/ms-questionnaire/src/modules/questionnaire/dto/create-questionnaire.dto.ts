import { IsNotEmpty, IsArray, ValidateNested, IsOptional, IsMongoId } from 'class-validator';
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
}