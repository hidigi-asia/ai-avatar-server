import { Body, Controller, Post } from '@nestjs/common';
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
}
