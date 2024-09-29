import { Module } from '@nestjs/common';
import { MsIamController } from './ms-iam.controller';
import { MsIamService } from './ms-iam.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';

import { AreaModule } from './modules/area/area.module';
import { MachineModule } from './modules/machine/machine.module';
import { UserMachineModule } from './modules/user-machine/user-machine.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE_MSIAM'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'ms-auth',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_HOST'),
            port: configService.get<number>('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    CompanyModule,
    AreaModule,
    MachineModule,
    UserMachineModule,
  ],
 
  controllers: [MsIamController],
  providers: [
    MsIamService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class MsIamModule {}
