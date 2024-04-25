export class GenerateAudioDto {
  text: string;
  type: string;
  tts_model: string;
  voice_id: string;
  stability: number;
  similarity_boost: number;
  style: number;
}
