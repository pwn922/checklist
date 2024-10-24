import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateSectionDto } from '../../section/dto/create-section.dto';
import { Type } from 'class-transformer';

export class CreateQuestionnaireDto {
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections!: CreateSectionDto[];
}