import { IsInt } from 'class-validator';

export class MeDto {
  @IsInt()
  id: number;
}
