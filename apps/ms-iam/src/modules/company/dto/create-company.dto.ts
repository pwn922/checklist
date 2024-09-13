import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    industry?: string;

    @IsOptional()
    @IsNumber()
    employeeCount?: number;

    @IsOptional()
    @IsString()
    address?: string;
}
