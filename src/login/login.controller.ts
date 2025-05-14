import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
export class LoginDto {
  @IsString()
  @MaxLength(100)
  email: string;

  @MaxLength(20)
  password: string
}
@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Res() res: Response,
    @Body() data: LoginDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      // Attempt to login and get a token
      const token = await this.loginService.login(data.email, data.password);

      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Login successful',
        data: token,
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
  async getAllLogins(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const login = await this.loginService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: login,
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
  async getLoginById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const login = await this.loginService.findByLogin(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: login,
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
