import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from './mail.service';

@Processor('mail-queue')
export class MailQueue extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any>) {
    const { email, subject, template, context } = job.data;

    await this.mailService.sendMail(email, subject, template, context);
  }
}
