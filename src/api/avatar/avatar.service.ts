import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AvatarService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createAvatarDto: CreateAvatarDto) {
    return await this.prismaService.avatar.create({ data: createAvatarDto });
  }

  async findAll() {
    return await this.prismaService.avatar.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.avatar.findUnique({ where: { id } });
  }

  async update(id: number, updateAvatarDto: UpdateAvatarDto) {
    return await this.prismaService.avatar.update({
      where: { id },
      data: updateAvatarDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.avatar.delete({ where: { id } });
  }

  downloadOne(key: string): ReadStream {
    var filePath = join(
      process.cwd(),
      this.configService.get('UPLOAD_PATH'),
      'avatars',
      key,
    );

    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }

    return createReadStream(filePath);
  }
}
