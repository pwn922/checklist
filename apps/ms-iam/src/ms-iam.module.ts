import { Module } from '@nestjs/common';
import { MsIamController } from './ms-iam.controller';
import { MsIamService } from './ms-iam.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';

import { AreaModule } from './modules/area/area.module';
import { MachineModule } from './modules/machine/machine.module';
import { UserMachineModule } from './modules/user-machine/user-machine.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    }),

    UserModule,

    CompanyModule,

    AreaModule,

    MachineModule,

    UserMachineModule,
  ],
  controllers: [MsIamController],
  providers: [MsIamService],
})
export class MsIamModule {}
