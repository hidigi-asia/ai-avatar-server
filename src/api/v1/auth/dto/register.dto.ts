import { IsValidEmail } from '@/api/v1/mail/decorator/is-valid-email.decorator';
import { IsString } from 'class-validator';

export class RegisterDto {
  @IsValidEmail()
  email: string;
  @IsString()
  password: string;
}
