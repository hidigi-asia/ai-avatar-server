import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Global()
@Module({
  controllers: [MailController],
  providers: [MailService, ConfigService],
})
export class MailModule {}
