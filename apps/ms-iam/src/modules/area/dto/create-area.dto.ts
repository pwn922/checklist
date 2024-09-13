import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAreaDto {}

export class createAreaDto{
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
     location?: string;
}

