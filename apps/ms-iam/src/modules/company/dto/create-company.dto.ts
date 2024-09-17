import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {}

export class createCompanyDto{
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    address?: string;
}
