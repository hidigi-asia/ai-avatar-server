import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsString()
  password: string;
}
