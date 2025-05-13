// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailQueue } from './email.queue';

@Controller('email')
export class EmailController {
  constructor(private readonly emailQueue: EmailQueue) {}

  @Post()
  async sendEmail(@Body() body: { to: string; subject: string; body: string }) {
    await this.emailQueue.addEmailJob(body);
    return { message: 'Email job queued' };
  }
}
