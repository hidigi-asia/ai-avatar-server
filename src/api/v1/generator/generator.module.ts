import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [GeneratorController],
  providers: [GeneratorService, PrismaService, ConfigService],
})
export class GeneratorModule {}
