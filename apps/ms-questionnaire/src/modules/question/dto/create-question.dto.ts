import { IsNotEmpty, IsEnum, IsMongoId, IsOptional, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuestionDto {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  observation!: string;

  @IsEnum(['multiple-choice', 'short-answer', 'single-choice'])
  @IsNotEmpty()
  type!: string;

  @IsMongoId()
  @IsOptional()
  sectionId?: Types.ObjectId;

  @IsArray()
  @IsOptional()
  answers?: Types.ObjectId[];

  @IsNumber()
  @IsOptional()
  position?: number;
}