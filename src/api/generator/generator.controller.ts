import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Response,
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { ApiTags } from '@nestjs/swagger';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateVideoDto } from './dto/generate-video.dto';

@ApiTags('Generators')
@Controller('generators')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('generate-audio')
  generateAudio(@Body() generateAudioDto: GenerateAudioDto) {
    return this.generatorService.generateAudio(generateAudioDto);
  }

  @Post('generate-video')
  generateVideo(@Body() generateVideoDto: GenerateVideoDto) {
    return this.generatorService.generateVideo(generateVideoDto);
  }

  @Get('generated/videos/:key/download')
  async downloadGeneratedVideo(@Param('key') id: string, @Response() res) {
    var file = await this.generatorService.downloadGeneratedVideo(id);

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    file.pipe(res);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename=${id}`);

    return res;
  }
}
