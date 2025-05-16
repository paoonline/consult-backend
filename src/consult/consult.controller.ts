import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { ConsultDto } from './consult.dto';
import { ConsultService } from './consult.service';

@Controller('/consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Res() res: Response,
    @Body() data: ConsultDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.createConsult(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: consult,
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
  async getAllCounsultTransaction(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
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
  async getCounsultTransactionById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findByConsultTransaction(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
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
