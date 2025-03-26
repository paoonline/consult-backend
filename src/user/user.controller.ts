import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { Response } from 'express';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.create(createUserDto);

      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: user,
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
  async getAllUsers(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.findAll();

      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: user,
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
  async getUserById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.findOne(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: user,
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
