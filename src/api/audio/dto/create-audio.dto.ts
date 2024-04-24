import { IsInt, IsString } from 'class-validator';

export class CreateAudioDto {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
  @IsInt()
  userId: number;
}
