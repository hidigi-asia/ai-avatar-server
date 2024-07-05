import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
  @IsOptional()
  @IsInt()
  userId?: number;
}
