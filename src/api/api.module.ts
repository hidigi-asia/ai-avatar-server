import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as fs from 'fs';
import { V1Module } from './v1/v1.module';
import { V2Module } from './v2/v2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => {
        var filePath = configService.get('UPLOAD_PATH');

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }

        return {
          dest: filePath,
        };
      },
    }),
    HttpModule.register({}),
    // V1Module,
    V2Module,
  ],
})
export class ApiModule {}
