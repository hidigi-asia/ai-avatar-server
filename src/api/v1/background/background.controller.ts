import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BackgroundService } from './background.service';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';

@ApiTags('Backgrounds')
@Controller('backgrounds')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Post()
  create(@Body() createBackgroundDto: CreateBackgroundDto) {
    return this.backgroundService.create(createBackgroundDto);
  }

  @Get()
  findAll() {
    return this.backgroundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backgroundService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBackgroundDto: UpdateBackgroundDto,
  ) {
    return this.backgroundService.update(+id, updateBackgroundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backgroundService.remove(+id);
  }

  @Get(':key/download')
  async downloadOne(@Param('key') id: string, @Response() res) {
    var file = await this.backgroundService.downloadOne(id);

    if (!file) {
      throw new InternalServerErrorException('File not found');
    }

    file.pipe(res);

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename=${id}`);

    return res;
  }
}
