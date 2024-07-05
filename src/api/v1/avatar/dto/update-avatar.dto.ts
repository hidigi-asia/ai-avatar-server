import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAvatarDto {
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
