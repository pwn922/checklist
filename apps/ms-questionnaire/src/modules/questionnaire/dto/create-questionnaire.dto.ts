import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuestionnaireDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  type!: string;

  @IsNotEmpty()
  description!: string;

  @IsArray()
  @IsOptional()
  sections?: Types.ObjectId[];
}