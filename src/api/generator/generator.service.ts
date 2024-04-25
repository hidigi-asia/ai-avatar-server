import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateVideoDto } from './dto/generate-video.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

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

    var url = `${this.configService.get('AI_SERVER_URL')}/generate_audio`;

    var response = await axios.post(url, entry);

    if (response.status >= 200 && response.status < 400) {
      var responseBody = response.data;

      var audio = {
        key: key,
        filename: response.data.data.key,
      };

      var audioResponse = await this.prismaService.audio.create({
        data: {
          key: audio.key,
          fileName: generateAudioDto.name,
          userId: generateAudioDto.userId,
        },
      });

      return audioResponse;
    }

    return response.data;
  }

  async generateVideo(generateVideoDto: GenerateVideoDto) {
    var key = uuidv4();

    var entry = {
      ...generateVideoDto,
      name: key,
    };

    var url = `${this.configService.get('AI_SERVER_URL')}/generate_video`;

    console.log(url);

    var request = axios.post(url, entry);

    var response = (await request) as any;

    if (response.status >= 200 && response.status < 400) {
      var responseBody = response.data;

      var video = {
        key: key,
      };

      this.prismaService.generatedVideo.create({
        data: {
          key: video.key,
          fileName: generateVideoDto.name,
          userId: generateVideoDto.userId,
        },
      });
    }

    return response.data;
  }
}
