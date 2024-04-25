import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService, PrismaService, ConfigService],
})
export class BackgroundModule {}
