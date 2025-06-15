import {
    Body,
    Controller,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { NotificationDto } from './application/dto/notification.dto';
import { NotificationService } from './application/notification.service';
@Controller('/notification')
export class ConsultController {
  constructor(
    private readonly notificationService: NotificationService
  ) 
  {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createNotification(
    @Res() res: Response,
    @Body() data: NotificationDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const notification = await this.notificationService.create(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: notification,
      });
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }
  

}