import {
    Body,
    Controller,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { IPaymentDto } from './application/dto/payment.dto';
import { PaymentService } from './application/payment.service';

@Controller('/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService
  ) 
  {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(
    @Res() res: Response,
    @Body() data: IPaymentDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const notification = await this.paymentService.create(data);
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