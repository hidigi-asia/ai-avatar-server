import { PartialType } from '@nestjs/swagger';
import { CreateModelDto } from './create-model.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateModelDto {
  @IsOptional()
  @IsString()
  name?: string;
}
