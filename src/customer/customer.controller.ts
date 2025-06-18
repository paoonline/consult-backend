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
import { Response } from 'express';
import { CustomerService } from './application/customer.service';
import { CustomerDto, IBooking } from './application/dto/customer.dto';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { CustomerBookingService } from './application/customer.booking.service';
import { CustomerType } from '@prisma/client';
@Controller('/customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerBookingService: CustomerBookingService,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() data: CustomerDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.customerService.create(data);
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
      const customer = await this.customerService.findAll(customerType);
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
      const customer = await this.customerService.findOne(id);
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
      const customer = await this.customerService.delete(id);
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
      const updatedCustomer = await this.customerService.update(id, safeData);

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
      const customer = await this.customerService.findCustomerDetail(id);
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
      const customer = await this.customerBookingService.create(data);
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
      const customer = await this.customerBookingService.delete(id, secondId);
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
