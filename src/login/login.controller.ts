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
import { LoginDto } from './application/login.dto';
import { FindAllLoginLogsUseCase } from './application/use-cases/find-all-login-logs.use-case';
import { FindOneLoginLogUseCase } from './application/use-cases/find-one-login-log.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';

@Controller('/auth')
export class LoginController {
  constructor(
    private readonly logoutUseCase: LogoutUseCase,
    private readonly findOneLoginLogUseCase: FindOneLoginLogUseCase,
    private readonly findAllLoginLogsUseCase: FindAllLoginLogsUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/login')
  async login(
    @Res() res: Response,
    @Body() data: LoginDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      // Attempt to login and get a token
      const token = await this.loginUseCase.execute(data.email, data.password);

      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Login successful',
        data: token,
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

  @Get('/login')
  @UseGuards(JwtAuthGuard)
  async getAllLogins(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const login = await this.findAllLoginLogsUseCase.execute();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: login,
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

  @Get('/login/:id')
  @UseGuards(JwtAuthGuard)
  async getLoginById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const login = await this.findOneLoginLogUseCase.execute(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: login,
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

  @Post('/logout')
  async logout(
    @Res() res: Response,
    @Body() dto: { key: string },
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.logoutUseCase.execute(`online:${dto.key}`);

      return res.status(200).json({
        status: 200,
        message: 'logout successful',
        data: '',
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
