import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService extends TypeOrmCrudService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }

  async export(id: string, body: any): Promise<any> {
    console.log(body);

    var response = await axios.post(
      `${process.env.AI_SERVER_URL}/process-project`,
      {
        project_data: {
          user_id: 0,
          project: {
            name: 'test',
            output_size: [1280, 1920],
            slides: [
              {
                name: 'Slide 1',
                elements: [
                  {
                    id: 'string',
                    name: 'string',
                    type: 'video',
                    url: 'e321b92d-b412-48a0-a8c4-0f14b7eb8b55.mp4',
                    kind: 'avatar',
                    tag: 'clip',
                    transform: {
                      position: {
                        x: 560,
                        y: 560,
                      },
                      size: {
                        width: 640,
                        height: 1280,
                      },
                    },
                    has_audio: true,
                  },
                  {
                    id: 'element2',
                    name: 'Element 2',
                    type: 'image',
                    url: 'd1098eb0-b8b5-49f1-95b5-f7262e1cb6f3.png',
                    kind: 'background',
                    tag: 'clip',
                    transform: {
                      position: {
                        x: 250,
                        y: 250,
                      },
                      size: {
                        width: 500,
                        height: 800,
                      },
                    },
                    has_audio: false,
                  },
                  {
                    id: 'element3',
                    name: 'Element 3',
                    type: 'audio',
                    url: '6f42a905-410a-4250-93cc-9bd993b28e39.mp4',
                    kind: 'speech',
                    tag: 'unknown',
                    transform: {
                      position: {
                        x: 100,
                        y: 100,
                      },
                      size: {
                        width: 200,
                        height: 50,
                      },
                    },
                    has_audio: false,
                  },
                ],
              },
            ],
          },
          voiceGeneratorConfig: {
            key: 'string',
            model: {},
            stability: 0,
            similarityBoost: 0,
            style: 0,
            inputText: 'string',
          },
        },
        other_video_urls: ['string'],
      },
    );

    return response;
  }
}
