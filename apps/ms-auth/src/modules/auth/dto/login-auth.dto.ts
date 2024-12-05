import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Por favor, ingrese un email válido' })
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}