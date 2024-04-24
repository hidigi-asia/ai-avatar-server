import { IsInt, IsString } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
  @IsInt()
  userId: number;
}
