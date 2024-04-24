import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [AudioController],
  providers: [AudioService, PrismaService],
})
export class AudioModule {}
