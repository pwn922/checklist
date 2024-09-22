import { Controller, Get, UseGuards } from '@nestjs/common';
import { MsIamService } from './ms-iam.service';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class MsIamController {
  constructor(private readonly MsIamService: MsIamService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.MsIamService.getHello();
  }
}