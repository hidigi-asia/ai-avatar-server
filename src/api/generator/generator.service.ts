import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateVideoDto } from './dto/generate-video.dto';
import axios from 'axios';

@Injectable()
export class GeneratorService {
  constructor(
    private prismaService: PrismaService,
    private httpService: HttpService,
  ) {}

  async generateAudio(generateAudioDto: GenerateAudioDto) {
    var body = {};

    var response = await axios.post(
      'http://localhost:5000/generate-audio',
      body,
    );

    return response.data;
  }

  async generateVideo(generateVideoDto: GenerateVideoDto) {
    var body = {};

    var response = await axios.post(
      'http://localhost:5000/generate-video',
      body,
    );

    return response.data;
  }
}
