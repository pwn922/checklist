import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { lastValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('ms-auth') private readonly client: ClientProxy,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    let user;
    try {
      user = await lastValueFrom(
        this.client.send(
          'check-access-token',
          token
        )
      );
    } catch (error) {
      console.debug("ERROR: ", error);
      return false;
    }

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}
