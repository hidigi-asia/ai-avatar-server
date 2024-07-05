import { Module } from '@nestjs/common';
import { AvatarTemplatesService } from './avatar-templates.service';
import { AvatarTemplatesController } from './avatar-templates.controller';

@Module({
  controllers: [AvatarTemplatesController],
  providers: [AvatarTemplatesService],
})
export class AvatarTemplatesModule {}
