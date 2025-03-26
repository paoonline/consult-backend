import { Body, Controller, Post } from '@nestjs/common';
import { Login } from './login.entity';
import { LoginService } from './login.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() data:{email: string, password: string}): Promise<Login | null> {
    return this.loginService.loginValidate(data.email, data.password)
  }
}
