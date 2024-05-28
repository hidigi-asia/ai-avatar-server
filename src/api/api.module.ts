import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AvatarModule } from './avatar/avatar.module';
import { BackgroundModule } from './background/background.module';
import { ModelModule } from './model/model.module';
import { GeneratorModule } from './generator/generator.module';
import { AudioModule } from './audio/audio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => ({
        dest: configService.get('UPLOAD_PATH'),
      }),
    }),
    HttpModule.register({}),
    PrismaModule,
    UserModule,
    AvatarModule,
    BackgroundModule,
    ModelModule,
    GeneratorModule,
    AudioModule,
    AuthModule,
  ],
})
export class ApiModule {}
