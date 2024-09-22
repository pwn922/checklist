import { Body, Controller, Post, HttpCode, HttpStatus, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refesh-token-auth.dto';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('renew-access-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.renewAccessToken(refreshTokenDto);
  }

  
  @Get('check-access-token')
  async checkAccessToken(@Headers('Authorization') authorizationHeader: string) {
      return this.authService.checkAccessToken(authorizationHeader);
  }



    /*
  @Get('validate-access-token')
  async validateAccessToken(@Headers('authorization') authorizationHeader: string): Promise<{ user: any }> {
    const user = await this.authService.validateAccessToken(authorizationHeader);
    return { user };
  }*/
}