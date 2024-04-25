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
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Audios')
@Controller('audios')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(+id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(+id);
  }

  @Get(':key/download')
  async downloadOne(@Param('key') id: string, @Response() res) {
    var file = await this.audioService.downloadOne(id);

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    file.pipe(res);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename=${id}`);

    return res;
  }
}
