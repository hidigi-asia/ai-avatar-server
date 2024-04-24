import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  InternalServerErrorException,
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Avatars')
@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  async create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarService.create(createAvatarDto);
  }

  @Get()
  async findAll() {
    return this.avatarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.avatarService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAvatarDto: UpdateAvatarDto,
  ) {
    return this.avatarService.update(+id, updateAvatarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.avatarService.remove(+id);
  }

  @Get(':key/download')
  async downloadOne(@Param('key') id: string, @Response() res) {
    var file = await this.avatarService.downloadOne(id);

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    file.pipe(res);

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename=${id}`);

    return res;
  }
}
