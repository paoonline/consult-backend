import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { IPaymentDto } from './application/dto/payment.dto';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { FindPaymentsByCustomerUseCase } from './application/use-cases/find-many-payment.use-case';
import { getErrorMessage } from 'src/utils/error';

@Controller('/payment')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly findPaymentsByCustomerUseCase: FindPaymentsByCustomerUseCase,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: IPaymentDto) {
    try {
      const notification = await this.createPaymentUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: notification,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findMany(@Param('id') id: string) {
    try {
      const customer = await this.findPaymentsByCustomerUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: customer,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
