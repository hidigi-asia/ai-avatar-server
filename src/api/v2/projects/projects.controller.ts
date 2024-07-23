import { Crud, CrudController } from '@dataui/crud';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Crud({
  model: {
    type: Project,
  },
  query: {
    filter: (query) => {
      return query;
    },
  },
})
@Controller('projects')
export class ProjectsController implements CrudController<Project> {
  constructor(public service: ProjectsService) {}

  @Post(':id/export')
  async export(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.service.export(id, body);
  }
}
