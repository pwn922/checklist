import { Injectable } from '@nestjs/common';

@Injectable()
export class MsIamService {
  getHello(): string {
    return 'Hello World!';
  }
}
