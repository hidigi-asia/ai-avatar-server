import { PartialType } from '@nestjs/swagger';
import { CreateBackgroundDto } from './create-background.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBackgroundDto {
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
