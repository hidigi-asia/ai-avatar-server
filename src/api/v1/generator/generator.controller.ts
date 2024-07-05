import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateProjectDto } from './dto/generate-video.dto';
import { GeneratorService } from './generator.service';

@ApiTags('Generators')
@Controller('generators')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('generate-audio')
  generateAudio(@Body() generateAudioDto: GenerateAudioDto) {
    return this.generatorService.generateAudio(generateAudioDto);
  }

  @Post('generate-project')
  @UseGuards(JwtAuthGuard)
  generateProject(
    @Body() generateProjectDto: GenerateProjectDto,
    @GetUser() user,
  ) {
    return this.generatorService.generateProject(generateProjectDto, +user.id);
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
