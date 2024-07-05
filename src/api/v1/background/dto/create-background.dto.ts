import { IsInt, IsString } from 'class-validator';

export class CreateBackgroundDto {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
  @IsInt()
  userId: number;
}
