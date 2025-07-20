import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomerType } from '@prisma/client';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { CustomerDto } from './application/dto/customer.dto';

import { CreateBookingUseCase } from './application/use-cases/booking/create-booking.use-case';
import { DeleteBookingUseCase } from './application/use-cases/booking/delete-booking.use-case';
import { CreateCustomerUseCase } from './application/use-cases/customer/create-customer.usecase';
import { DeleteCustomerUseCase } from './application/use-cases/customer/delete-customer.usecase';
import { FindAllCustomersUseCase } from './application/use-cases/customer/find-all-customers.usecase';
import { FindOneCustomerUseCase } from './application/use-cases/customer/find-one-customer.usecase';
import { UpdateCustomerUseCase } from './application/use-cases/customer/update-customer.usecase';
import { FindOneCustomerDetailUseCase } from './application/use-cases/customerDetail/find-one-customer-detail.usecase';
import { IBooking } from './application/dto/customer';
@Controller('/customer')
export class CustomerController {
  constructor(
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,

    private readonly deleteBookingUseCase: DeleteBookingUseCase,
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly findOneCustomerDetailUseCase: FindOneCustomerDetailUseCase,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() data: CustomerDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.createCustomerUseCase.execute(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: customer,
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

  @Get(':customerType')
  @UseGuards(JwtAuthGuard)
  async getAllCustomers(
    @Res() res: Response,
    @Param('customerType') customerType: CustomerType,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.findAllCustomersUseCase.execute(customerType);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCustomerById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.findOneCustomerUseCase.execute(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCustomerById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.deleteCustomerUseCase.execute(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatCustomer(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() customerDto: CustomerDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const safeData = {
        ...customerDto,
        email: undefined,
      };
      const updatedCustomer = await this.updateCustomerUseCase.execute(
        id,
        safeData,
      );

      if (!updatedCustomer) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Customer not found',
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: updatedCustomer,
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

  @Get('/detail/:id')
  @UseGuards(JwtAuthGuard)
  async findCustomerDetail(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.findOneCustomerDetailUseCase.execute(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
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

  @Post('/booking')
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @Res() res: Response,
    @Body() data: IBooking[],
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.createBookingUseCase.execute(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: customer,
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

  @Delete('/booking/:id/:secondId')
  @UseGuards(JwtAuthGuard)
  async bookingMeeting(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('secondId') secondId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.deleteBookingUseCase.execute(id, secondId);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: customer,
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
