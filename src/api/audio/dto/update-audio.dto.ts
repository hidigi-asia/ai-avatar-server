import { PartialType } from '@nestjs/swagger';
import { CreateAudioDto } from './create-audio.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAudioDto {
  @IsOptional()
  @IsString()
  fileName?: string;
  @IsOptional()
  @IsString()
  url?: string;
  @IsOptional()
  @IsInt()
  userId?: number;
}
