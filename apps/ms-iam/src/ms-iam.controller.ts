import { Controller, Get } from '@nestjs/common';
import { MsIamService } from './ms-iam.service';

@Controller()
export class MsIamController {
  constructor(private readonly MsIamService: MsIamService) {}

  @Get()
  getHello(): string {
    return this.MsIamService.getHello();
  }
}