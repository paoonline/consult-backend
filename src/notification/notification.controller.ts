import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { NotificationDto } from './application/dto/notification.dto';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.use-case';
@Controller('/notification')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createNotification(
    @Res() res: Response,
    @Body() data: NotificationDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const notification = await this.createNotificationUseCase.execute(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: notification,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }
}
