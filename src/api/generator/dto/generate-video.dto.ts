import { PartialType } from '@nestjs/swagger';
import { GenerateAudioDto } from './generate-audio.dto';
import { IsInt, IsObject, IsString } from 'class-validator';

export class GenerateVideoDto {
  @IsObject()
  avatar: { key: string };
  @IsObject()
  background: { key: string };
  @IsObject()
  audio: { key: string };
  @IsString()
  name: string;
  @IsInt()
  userId: number;
}
