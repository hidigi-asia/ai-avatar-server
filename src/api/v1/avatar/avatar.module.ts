import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService, PrismaService, ConfigService],
})
export class AvatarModule {}
