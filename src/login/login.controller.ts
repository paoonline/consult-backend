import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './login.service';
import {  Response } from 'express';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: AuthService) {}

  @Post()
  async login(
    @Res() res: Response,
    @Body() data: { email: string; password: string },
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
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }
}
