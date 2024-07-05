import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService, ConfigService],
})
export class ModelModule {}
