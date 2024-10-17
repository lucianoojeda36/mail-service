import { Controller, Post, Body, Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    this.logger.log(`Sending email to: ${sendEmailDto.to}`);
    try {
      await this.mailService.sendMail(
        sendEmailDto.to,
        'Here is your recipe',
        sendEmailDto.template,
        sendEmailDto.context,
      );
      this.logger.log(`Email sent successfully to: ${sendEmailDto.to}`);
      return { message: 'Email sent successfully' };
    } catch (error) {
      this.logger.error(
        `Failed to send email to: ${sendEmailDto.to}`,
        error.stack,
      );
      throw error;
    }
  }
}
