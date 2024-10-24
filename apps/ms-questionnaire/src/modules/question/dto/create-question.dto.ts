import { IsNotEmpty, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  observation!: string;

  /*
  @IsNumber()
  number!: number;
*/
  /*
  @IsEnum(['multiple-choice', 'short-answer', 'single-choice'])
  @IsNotEmpty()
  type!: string;
  */

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers!: CreateAnswerDto[];
}