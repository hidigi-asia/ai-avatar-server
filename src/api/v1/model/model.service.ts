import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private prismaService: PrismaService) {}

  async create(createModelDto: CreateModelDto) {
    return await this.prismaService.model.create({ data: createModelDto });
  }

  async findAll() {
    return await this.prismaService.model.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.model.findUnique({ where: { id } });
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    return await this.prismaService.model.update({
      where: { id },
      data: updateModelDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.model.delete({ where: { id } });
  }
}
