import { IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  name: string;
  @IsString()
  voiceId: string;
}
