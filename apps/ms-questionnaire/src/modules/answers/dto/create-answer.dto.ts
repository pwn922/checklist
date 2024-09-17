import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {}

export class createAnswerDto{
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    location?: string;
}