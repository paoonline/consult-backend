import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import {  Response } from 'express';
import { CustomerService } from './application/customer.service';
import { CustomerDto } from './application/customer.dto';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCustomers(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.customerService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatCustomer(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() customerDto: CustomerDto
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
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }
}
