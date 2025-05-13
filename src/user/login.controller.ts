import { Body, Controller, Post, Res } from '@nestjs/common';
import {  Response } from 'express';
import { LoginService } from './login.service';
import { IsString, MaxLength } from 'class-validator';
class LoginDto {
  @IsString()
  @MaxLength(100)
  email_id: string;
}
@Controller('/user')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async createUser(
    @Res() res: Response,
    @Body() data: LoginDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      // Attempt to login and get a token
      const token = await this.loginService.createLog(data);

      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Login successful',
        data: token,
      });
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }
}
