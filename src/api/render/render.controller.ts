import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service';

@Controller('render')
export class RenderController {
  constructor(private readonly renderService: RenderService) {}

  @Post()
  async render(@Body() data: any): Promise<string> {
    return await this.renderService.renderVideo(data);
  }
}
