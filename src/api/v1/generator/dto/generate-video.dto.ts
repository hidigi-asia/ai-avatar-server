import { IsArray, IsObject, IsString } from 'class-validator';

export class GenerateProjectDto {
  @IsString()
  name: string;
  @IsObject({
    each: true,
  })
  size: {
    width: number;
    height: number;
  };
  @IsArray()
  slides: object[];
}
