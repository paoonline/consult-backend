import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { LoginDto } from './application/login.dto';
import { FindAllLoginLogsUseCase } from './application/use-cases/find-all-login-logs.use-case';
import { FindOneLoginLogUseCase } from './application/use-cases/find-one-login-log.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { getErrorMessage } from 'src/utils/error';

@Controller('/auth')
export class LoginController {
  constructor(
    private readonly logoutUseCase: LogoutUseCase,
    private readonly findOneLoginLogUseCase: FindOneLoginLogUseCase,
    private readonly findAllLoginLogsUseCase: FindAllLoginLogsUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    try {
      const token = await this.loginUseCase.execute(data.email, data.password);
      return {
        status: 200,
        message: 'Login successful',
        data: token,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/login')
  @UseGuards(JwtAuthGuard)
  async getAllLogins() {
    try {
      const login = await this.findAllLoginLogsUseCase.execute();
      return {
        status: 200,
        message: 'successful',
        data: login,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/login/:id')
  @UseGuards(JwtAuthGuard)
  async getLoginById(@Param('id') id: string) {
    try {
      const login = await this.findOneLoginLogUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: login,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Post('/logout')
  async logout(@Body() dto: { key: string }) {
    try {
      await this.logoutUseCase.execute(`online:${dto.key}`);
      return {
        status: 200,
        message: 'Logout successful',
        data: '',
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
