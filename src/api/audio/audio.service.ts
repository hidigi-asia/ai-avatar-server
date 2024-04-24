import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';

import * as fs from 'fs';

@Injectable()
export class AudioService {
  constructor(private prismaService: PrismaService) {}

  async create(createAudioDto: CreateAudioDto) {
    return await this.prismaService.audio.create({ data: createAudioDto });
  }

  async findAll() {
    return await this.prismaService.audio.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.audio.findUnique({ where: { id } });
  }

  async update(id: number, updateAudioDto: UpdateAudioDto) {
    return await this.prismaService.audio.update({
      where: { id },
      data: updateAudioDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.audio.delete({ where: { id } });
  }

  downloadOne(key: string): ReadStream {
    var filePath = join(process.cwd(), 'storage/python/uploads', 'audios', key);

    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }

    return createReadStream(filePath);
  }
}
