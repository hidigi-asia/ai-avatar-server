import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AudioModule } from './audio/audio.module';
import { AuthModule } from './auth/auth.module';
import { AvatarTemplatesModule } from './avatar-templates/avatar-templates.module';
import { AvatarModule } from './avatar/avatar.module';
import { BackgroundModule } from './background/background.module';
import { GeneratorModule } from './generator/generator.module';
import { MailModule } from './mail/mail.module';
import { ModelModule } from './model/model.module';
import { RenderModule } from './render/render.module';
import { TemplatesModule } from './templates/templates.module';
import { UserModule } from './user/user.module';

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
    TemplatesModule,
    AvatarTemplatesModule,
    MailModule,
    RenderModule,
  ],
})
export class ApiModule {}
