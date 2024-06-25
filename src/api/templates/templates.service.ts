import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  findAll() {
    const templates: Template[] = [];

    for (let i = 0; i < 100; i++) {
      templates.push({
        id: i,
        name: `Template ${i}`,
        previewUrl: `https://via.placeholder.com/150?text=Template+${i}`,
        description: `Description of template ${i}`,
      });
    }

    return templates;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
