import { IsNotEmpty, IsMongoId, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSectionDto {
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  questions?: Types.ObjectId[];

  @IsMongoId()
  @IsNotEmpty()
  questionnaireId!: Types.ObjectId;
}