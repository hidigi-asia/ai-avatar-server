import { PartialType } from '@nestjs/swagger';
import { CreateAvatarTemplateDto } from './create-avatar-template.dto';

export class UpdateAvatarTemplateDto extends PartialType(CreateAvatarTemplateDto) {}
