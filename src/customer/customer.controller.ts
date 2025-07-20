import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerType } from '@prisma/client';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';

import { CustomerDto } from './application/dto/customer.dto';
import { IBooking } from './application/dto/customer';

import { CreateCustomerUseCase } from './application/use-cases/customer/create-customer.usecase';
import { DeleteCustomerUseCase } from './application/use-cases/customer/delete-customer.usecase';
import { FindAllCustomersUseCase } from './application/use-cases/customer/find-all-customers.usecase';
import { FindOneCustomerUseCase } from './application/use-cases/customer/find-one-customer.usecase';
import { UpdateCustomerUseCase } from './application/use-cases/customer/update-customer.usecase';
import { CreateBookingUseCase } from './application/use-cases/booking/create-booking.use-case';
import { DeleteBookingUseCase } from './application/use-cases/booking/delete-booking.use-case';
import { FindOneCustomerDetailUseCase } from './application/use-cases/customerDetail/find-one-customer-detail.usecase';

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
  @HttpCode(200)
  async create(@Body() data: CustomerDto) {
    try {
      const customer = await this.createCustomerUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: customer,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get(':customerType')
  @UseGuards(JwtAuthGuard)
  async getAllCustomers(@Param('customerType') customerType: CustomerType) {
    try {
      const customers =
        await this.findAllCustomersUseCase.execute(customerType);
      return {
        status: 200,
        message: 'successful',
        data: customers,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  async getCustomerById(@Param('id') id: string) {
    try {
      const customer = await this.findOneCustomerUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: customer,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCustomerById(@Param('id') id: string) {
    try {
      const customer = await this.deleteCustomerUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: customer,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCustomer(
    @Param('id') id: string,
    @Body() customerDto: CustomerDto,
  ) {
    try {
      const safeData = {
        ...customerDto,
        email: undefined, // ไม่อนุญาตให้เปลี่ยน email
      };

      const updatedCustomer = await this.updateCustomerUseCase.execute(
        id,
        safeData,
      );
      if (!updatedCustomer) {
        throw new NotFoundException('Customer not found');
      }

      return {
        status: 200,
        message: 'successful',
        data: updatedCustomer,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/detail/:id')
  @UseGuards(JwtAuthGuard)
  async findCustomerDetail(@Param('id') id: string) {
    try {
      const customer = await this.findOneCustomerDetailUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: customer,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Post('/booking')
  @UseGuards(JwtAuthGuard)
  async createBooking(@Body() data: IBooking[]) {
    try {
      const result = await this.createBookingUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Delete('/booking/:id/:secondId')
  @UseGuards(JwtAuthGuard)
  async bookingMeeting(
    @Param('id') id: string,
    @Param('secondId') secondId: string,
  ) {
    try {
      const result = await this.deleteBookingUseCase.execute(id, secondId);
      return {
        status: 200,
        message: 'Delete successful',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error occurred';
  }
}
