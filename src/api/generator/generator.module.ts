import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [GeneratorController],
  providers: [GeneratorService, PrismaService],
})
export class GeneratorModule {}
