import { Injectable } from '@nestjs/common';

@Injectable()
export class MsQuestionnaireService {
  getHello(): string {
    return 'Hello World!';
  }
}
