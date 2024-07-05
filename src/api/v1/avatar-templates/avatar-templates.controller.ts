import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvatarTemplatesService } from './avatar-templates.service';
import { CreateAvatarTemplateDto } from './dto/create-avatar-template.dto';
import { UpdateAvatarTemplateDto } from './dto/update-avatar-template.dto';

@Controller('avatar-templates')
export class AvatarTemplatesController {
  constructor(private readonly avatarTemplatesService: AvatarTemplatesService) {}

  @Post()
  create(@Body() createAvatarTemplateDto: CreateAvatarTemplateDto) {
    return this.avatarTemplatesService.create(createAvatarTemplateDto);
  }

  @Get()
  findAll() {
    return this.avatarTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avatarTemplatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvatarTemplateDto: UpdateAvatarTemplateDto) {
    return this.avatarTemplatesService.update(+id, updateAvatarTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avatarTemplatesService.remove(+id);
  }
}
