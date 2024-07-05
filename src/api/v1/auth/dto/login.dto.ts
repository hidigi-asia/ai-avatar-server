import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  identifier: string;
  @IsString()
  password: string;
}
