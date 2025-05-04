import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Res,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @UseGuards(JwtAuthGuard)
  async createCustomer(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const customer = await this.customerService.create(createCustomerDto, file);

      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: customer,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
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
      return res.status(401).json({
        status: 401,
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
      return res.status(401).json({
        status: 401,
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
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }
}
