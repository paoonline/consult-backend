import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { NotificationDto } from './application/dto/notification.dto';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.use-case';
import { getErrorMessage } from 'src/utils/error';
@Controller('/notification')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createNotification(@Body() data: NotificationDto) {
    try {
      const notification = await this.createNotificationUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: notification,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
