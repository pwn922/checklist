import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refesh-token-auth.dto';

interface UserPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;
  private readonly accessTokenExpiresIn = '1d';
  private readonly refreshTokenExpiresIn = '7d';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { password, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userService.create({
      ...rest,
      password: hashedPassword,
    });

    return { message: 'User created successfully' };
  }

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    const passwordMatch = user && await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException(['Invalid credentials']);
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken
    };
  }

  async checkAccessToken(authHeader: string)  {
    try {
      const accessToken = this.extractTokenFromHeader(authHeader);
      console.debug("ms-auth.service payload accessToken: ", accessToken);

      const JWT_ACCESS_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
      if (!JWT_ACCESS_SECRET) {
        throw new InternalServerErrorException('JWT access secret is not defined in environment variables');
      }

      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_ACCESS_SECRET,
      });

      const user = await this.userService.findOne({ _id: payload.id, active: true });

      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  async renewAccessToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const { refreshToken } = refreshTokenDto;
    try {
      const JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET');
      if (!JWT_REFRESH_SECRET) {
        throw new InternalServerErrorException('JWT refresh secret is not defined in environment variables');
      }

      let payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: JWT_REFRESH_SECRET,
      });

      payload = { id: payload.id, email: payload.email };

      const accessToken = await this.generateAccessToken(payload);
      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid renew access token');
    }
  }

  private async generateRefreshToken(payload: UserPayload): Promise<string> {
    const JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET');
    if (!JWT_REFRESH_SECRET) {
      throw new InternalServerErrorException('JWT refresh secret is not defined in environment variables');
    }

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: this.refreshTokenExpiresIn,
    });

    return refreshToken;
  }

  private async generateAccessToken(payload: UserPayload): Promise<string> {
    const JWT_ACCESS_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
    if (!JWT_ACCESS_SECRET) {
      throw new InternalServerErrorException('JWT access secret is not defined in environment variables');
    }

    console.debug(payload);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: this.accessTokenExpiresIn,
    });

    console.debug(accessToken);

    return accessToken;
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return tokenParts[1];
  }
}
