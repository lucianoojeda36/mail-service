import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  async sendMailToQueue(
    email: string,
    subject: string,
    template: string,
    context: any,
  ) {
    this.logger.log(`Adding email to queue: ${email}`);
    await this.mailQueue.add('send-mail-job', {
      email,
      subject,
      template,
      context,
    });
    this.logger.log(`Email added to queue successfully: ${email}`);
  }

  async sendMail(
    email: string,
    subject: string,
    template: string,
    context: any,
  ) {
    this.logger.log(`Sending email directly to: ${email}`);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject,
        template,
        context,
      });
      this.logger.log(`Email sent successfully to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to: ${email}`, error.stack);
      throw error;
    }
  }
}
