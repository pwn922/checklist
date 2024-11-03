import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { Machine, MachineSchema } from './schemas/machine.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from '../area/schemas/area.schema';
import { AreaService } from '../area/area.service';


export class QuestionnaireModule {}


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Machine.name, schema: MachineSchema },
      { name: Area.name, schema: AreaSchema },

    ]),
  ],
  controllers: [MachineController],
  providers: [
    MachineService,
    AreaService
  ],
})
export class MachineModule {}
