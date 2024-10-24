import { IsNotEmpty, IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { Type } from 'class-transformer';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions!: CreateQuestionDto[];
}