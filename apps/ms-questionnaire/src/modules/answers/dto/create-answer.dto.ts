import { IsNotEmpty, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  content!: string;

  @IsMongoId()
  @IsNotEmpty()
  questionId!: string;
}