import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import * as dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

@Module({
  imports: [
    // BullMQ configuration
    BullModule.forRoot({
      connection: {
        host: 'localhost', // Redis host
        port: 6379, // Redis port
      },
    }),

    // MailerModule configuration
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Change to your SMTP server (example: Gmail)
        port: 587, // SMTP port for Gmail
        secure: false, // Use STARTTLS
        auth: {
          user: process.env.MAILDEV_INCOMING_USER, // Your email
          pass: process.env.MAILDEV_INCOMING_PASS, // Your application password (for Gmail, use app passwords)
        },
      },
      defaults: {
        from: `No Reply ${process.env.MAILDEV_INCOMING_USER}`, // Default email address
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
