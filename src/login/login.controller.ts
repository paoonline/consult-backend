import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './application/login.service';
import { IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
export class LoginDto {
  @IsString()
  @MaxLength(100)
  email: string;

  @MaxLength(20)
  password: string
}
@Controller('/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
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

  @Get('/login')
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

  @Get('/login/:id')
  @UseGuards(JwtAuthGuard)
  async getLoginById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const login = await this.loginService.findOne(id);
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

  @Post('/logout')
  async logout(
    @Res() res: Response,
    @Body() dto: {key: string},
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.loginService.logout(`online:${dto.key}`)

      return res.status(200).json({
        status: 200,
        message: 'logout successful',
        data: '',
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
