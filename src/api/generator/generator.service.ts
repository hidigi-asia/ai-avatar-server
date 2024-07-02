import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { GenerateAudioDto } from './dto/generate-audio.dto';
import { GenerateProjectDto } from './dto/generate-video.dto';

@Injectable()
export class GeneratorService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async generateAudio(generateAudioDto: GenerateAudioDto) {
    var key = uuidv4() + '.wav';

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

  async generateProject(generateVideoDto: GenerateProjectDto, userId: number) {
    try {
      var key = uuidv4() + '.mp4';

      var entry = {
        "project_data": {
          "user_id": 0,
          "project": {
            "name": "string",
            "output_size": [0, 0],
            "slides": [
              {
                "name": "slide1",
                "elements": [
                  {
                    "id": "string",
                    "name": "string",
                    "type": "string",
                    "url": "business_woman_suit.webm",
                    "kind": "avatar",
                    "transform": {
                      "position": {"x": 0, "y": 0},
                      "size": {"width": 0, "height": 0}
                    },
                    "has_audio": false
                  },
                  {
                    "id": "string",
                    "name": "string",
                    "type": "string",
                    "url": "Hello.wav",
                    "kind": "speech",
                    "transform": {
                      "position": {"x": 0, "y": 0},
                      "size": {"width": 0, "height": 0}
                    },
                    "has_audio": true
                  }
                ]
              },
              {
                "name": "slide2",
                "elements": [
                  {
                    "id": "string2",
                    "name": "string2",
                    "type": "string",
                    "url": "Greeting.mp4",
                    "kind": "avatar",
                    "transform": {
                      "position": {"x": 1, "y": 1},
                      "size": {"width": 1, "height": 1}
                    },
                    "has_audio": false
                  },
                  {
                    "id": "string2",
                    "name": "string2",
                    "type": "string",
                    "url": "Tidak.wav",
                    "kind": "speech",
                    "transform": {
                      "position": {"x": 1, "y": 1},
                      "size": {"width": 1, "height": 1}
                    },
                    "has_audio": true
                  }
                ]
              }
            ]
          },
          "voiceGeneratorConfig": {
            "key": "string",
            "model": {},
            "stability": 0,
            "similarityBoost": 0.0,
            "style": 0.0,
            "inputText": "string"
          }
        },
        "other_video_urls": ["string"]
      };

      var url = `${this.configService.get('AI_SERVER_URL')}/process-project`;

      var request = axios.post(url, entry);

      var response = (await request) as any;

      // if (response.status >= 200 && response.status < 400) {
      //   var responseBody = response.data;

      //   var video = {
      //     key: key,
      //   };
      //   this.prismaService.generatedVideo.create({
      //     data: {
      //       key: video.key,
      //       fileName: generateVideoDto.name,
      //       userId: userId,
      //     },
      //   });
      // }

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  downloadGeneratedVideo(key: string): ReadStream {
    var filePath = join(
      process.cwd(),
      this.configService.get('UPLOAD_PATH'),
      'generated-videos',
      key,
    );

    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('File not found');
    }

    return createReadStream(filePath);
  }
}
