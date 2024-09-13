import { Controller, Get } from '@nestjs/common';
import { MsQuestionnaireService } from './ms-questionnaire.service';

@Controller()
export class MsQuestionnaireController {
  constructor(private readonly msQuestionnaireService: MsQuestionnaireService) {}

  @Get()
  getHello(): string {
    return this.msQuestionnaireService.getHello();
  }
}
