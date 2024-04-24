import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class BackgroundService {
  constructor(private prismaService: PrismaService) {}

  async create(createBackgroundDto: CreateBackgroundDto) {
    return await this.prismaService.background.create({
      data: createBackgroundDto,
    });
  }

  async findAll() {
    return await this.prismaService.background.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.background.findUnique({ where: { id } });
  }

  async update(id: number, updateBackgroundDto: UpdateBackgroundDto) {
    return await this.prismaService.background.update({
      where: { id },
      data: updateBackgroundDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.background.delete({ where: { id } });
  }

  downloadOne(key: string): ReadStream {
    var filePath = join(
      process.cwd(),
      'storage/python/uploads',
      'backgrounds',
      key,
    );

    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }

    return createReadStream(filePath);
  }
}
