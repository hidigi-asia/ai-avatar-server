import { Controller, Post } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Generators')
@Controller('generators')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('generate-audio')
  generateAudio() {
    return this.generatorService.generateAudio();
  }

  @Post('generate-video')
  generateVideo() {
    return this.generatorService.generateVideo();
  }
}
