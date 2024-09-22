import { Body, Controller, Post, HttpCode, HttpStatus, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refesh-token-auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('renew-access-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.renewAccessToken(refreshTokenDto);
  }

  @MessagePattern('check-access-token')
  async checkAccessToken(@Payload() accessToken: any) {
      return this.authService.checkAccessToken(accessToken);
  }
}