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
import { DeviceTokenDto } from './application/dto/device-token.dto';
import { RegisterDeviceTokenUseCase } from './application/use-cases/deviceToken/register-device-token.use-case';
@Controller('/notification')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly registerDeviceTokenUseCase: RegisterDeviceTokenUseCase,
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

  @Post('/device-token')
  async register(@Body() data: DeviceTokenDto) {
    try {
      const result = await this.registerDeviceTokenUseCase.execute(data);

      return {
        status: 200,
        message: 'Create successful',
        data: result,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
