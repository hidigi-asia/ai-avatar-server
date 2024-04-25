import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async uploadAvatar(userId: number, file: Express.Multer.File) {
    var key = uuidv4();

    const filePath = join(
      process.cwd(),
      this.configService.get('UPLOAD_PATH'),
      'avatars',
      key,
    );

    fs.writeFileSync(filePath, file.buffer);

    var avatar = await this.prismaService.avatar.create({
      data: {
        key: key,
        userId: userId,
        fileName: file.originalname,
      },
    });

    return avatar;
  }

  async getAvatars(userId: number) {
    return await this.prismaService.avatar.findMany({
      where: { userId: userId || null },
    });
  }

  async uploadBackground(userId: number, file: Express.Multer.File) {
    var key = uuidv4();

    const filePath = join(
      process.cwd(),
      this.configService.get('UPLOAD_PATH'),
      'backgrounds',
      key,
    );

    fs.writeFileSync(filePath, file.buffer);

    var background = await this.prismaService.background.create({
      data: {
        key: key,
        userId: userId,
        fileName: file.originalname,
      },
    });

    return background;
  }

  async getBackgrounds(userId: number) {
    return await this.prismaService.background.findMany({
      where: { userId: userId },
    });
  }

  async uploadAudio(userId: number, file: Express.Multer.File) {
    var key = uuidv4();

    const filePath = join(
      process.cwd(),
      this.configService.get('UPLOAD_PATH'),
      'audios',
      key,
    );

    fs.writeFileSync(filePath, file.buffer);

    var audio = await this.prismaService.audio.create({
      data: {
        key: key,
        userId: userId,
        fileName: file.originalname,
      },
    });

    return audio;
  }

  async getAudios(userId: number) {
    return await this.prismaService.audio.findMany({
      where: { userId: userId },
    });
  }
}
