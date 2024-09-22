import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule sea global, no necesitas importarlo en otros módulos.
      envFilePath: '.env', // Especifica el archivo de variables de entorno.
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE_MSAUTH'),
      }),
    }),
    AuthModule,
    UserModule,
  ],
  //controllers: [MsAuthController],
  //providers: [MsAuthService],
})
export class MsAuthModule {}
