import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('ms-auth') private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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