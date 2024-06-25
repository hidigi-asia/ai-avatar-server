import { Injectable } from '@nestjs/common';
import { CreateAvatarTemplateDto } from './dto/create-avatar-template.dto';
import { UpdateAvatarTemplateDto } from './dto/update-avatar-template.dto';
import axios from 'axios';

const CATEGORIES = [
  'Recommended',
  'Business',
  'Lifestyle',
  'Education',
  'Occupation',
  'Marketing',
];

@Injectable()
export class AvatarTemplatesService {
  create(createAvatarTemplateDto: CreateAvatarTemplateDto) {
    return 'This action adds a new avatarTemplate';
  }

  async findAll() {
    const response = await axios.get('https://randomuser.me/api/?results=100');
    return response.data.results.map((user: any) => ({
      name: `${user.name.first} ${user.name.last}`,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      img: `https://via.placeholder.com/150?text=${user.username}`,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} avatarTemplate`;
  }

  update(id: number, updateAvatarTemplateDto: UpdateAvatarTemplateDto) {
    return `This action updates a #${id} avatarTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} avatarTemplate`;
  }
}
