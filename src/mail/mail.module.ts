import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailService } from './mail.service';
import { MailQueue } from './mail.queue';
import { NotificationController } from './mail.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  providers: [MailService, MailQueue],
  controllers: [NotificationController],
  exports: [MailService],
})
export class MailModule {}
