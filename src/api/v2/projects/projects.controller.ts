import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Crud, CrudController } from '@dataui/crud';
import { Project } from './entities/project.entity';

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
}
