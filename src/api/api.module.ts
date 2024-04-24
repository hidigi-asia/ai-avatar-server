import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AvatarModule } from './avatar/avatar.module';
import { BackgroundModule } from './background/background.module';
import { ModelModule } from './model/model.module';
import { GeneratorModule } from './generator/generator.module';
import { AudioModule } from './audio/audio.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    MulterModule.register({
      dest: './storage/python/uploads',
    }),
    HttpModule,
    PrismaModule,
    UserModule,
    AvatarModule,
    BackgroundModule,
    ModelModule,
    GeneratorModule,
    AudioModule,
  ],
})
export class ApiModule {}
