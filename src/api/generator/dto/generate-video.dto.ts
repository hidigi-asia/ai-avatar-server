import { PartialType } from '@nestjs/swagger';
import { GenerateAudioDto } from './generate-audio.dto';

export class GenerateVideoDto {
  avatar: { key: string };
  background: { key: string };
  audio: { key: string };
  name: string;
}
