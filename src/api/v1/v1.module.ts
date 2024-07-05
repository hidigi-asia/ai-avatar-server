import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as fs from 'fs';
import { join } from 'path';
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
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => {
        var relativePath = configService.get('UPLOAD_PATH') as string;

        const absolutePath = join(process.cwd(), relativePath);

        if (!fs.existsSync(relativePath)) {
          fs.mkdirSync(relativePath, { recursive: true });
        }

        return [
          {
            rootPath: absolutePath,
            serveRoot: '/public',
          },
        ];
      },
    }),
  ],
})
export class V1Module {}
