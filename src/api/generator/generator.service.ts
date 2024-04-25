import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateVideoDto } from './dto/generate-video.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { uuidv4 } from 'uuid';

@Injectable()
export class GeneratorService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async generateAudio(generateAudioDto: GenerateAudioDto) {
    var key = uuidv4();

    var entry = {
      ...generateAudioDto,
      name: key,
    };

    var response = await axios.post(
      `${this.configService.get('AI_SERVER_URL')}/generate-audio`,
      entry,
    );

    if (response.status >= 200 && response.status < 400) {
      var responseBody = response.data;

      var audio = {
        key: responseBody.data.key,
        filename: response.data.data.key,
      };

      this.prismaService.audio.create({
        data: {
          key: audio.key,
          fileName: audio.filename,
        },
      });
    }

    return response.data;
  }

  async generateVideo(generateVideoDto: GenerateVideoDto) {
    var key = uuidv4();

    var entry = {
      ...generateVideoDto,
      name: key,
    };

    var response = await axios.post(
      `${this.configService.get('AI_SERVER_URL')}/generate-video`,
      entry,
    );

    if (response.status >= 200 && response.status < 400) {
      var responseBody = response.data;

      var video = {
        key: responseBody.data.key,
      };

      this.prismaService.generatedVideo.create({
        data: {
          key: video.key,
        },
      });
    }

    return response.data;
  }
}
