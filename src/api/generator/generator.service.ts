import { Injectable } from '@nestjs/common';
import { CreateGeneratorDto } from './dto/create-generator.dto';
import { UpdateGeneratorDto } from './dto/update-generator.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class GeneratorService {
  constructor(private prismaService: PrismaService) {}

  async generateAudio() {}

  async generateVideo() {}
}
