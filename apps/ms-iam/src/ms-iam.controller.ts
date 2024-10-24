import { Controller } from '@nestjs/common';
import { MsIamService } from './ms-iam.service';

@Controller()
export class MsIamController {
  constructor(private readonly MsIamService: MsIamService) {}


  getHello(): string {
    return this.MsIamService.getHello();
  }
}