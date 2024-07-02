import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

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
      fs.mkdirSync(filePath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }

    return createReadStream(filePath);
  }
}
