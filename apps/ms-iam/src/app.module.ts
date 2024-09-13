import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { AreaModule } from './modules/area/area.module';
import { MachineModule } from './modules/machine/machine.module';
import { UserMachineModule } from './modules/user-machine/user-machine.module';
import { UserMachineModule } from './modules/user-machine/user-machine.module';
import { MachineModule } from './modules/machine/machine.module';
import { AreaModule } from './modules/area/area.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
