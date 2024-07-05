import { IsInt } from 'class-validator';

export class GenerateAudioDto {
  text: string;
  name: string;
  type: string;
  tts_model: string;
  voice_id: string;
  stability: number;
  similarity_boost: number;
  style: number;
  @IsInt()
  userId: number;
}
