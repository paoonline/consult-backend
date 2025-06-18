import { Module } from '@nestjs/common';
import { LoginService } from './application/login.service';
import { LoginController } from './login.controller';

import { PrismaService } from 'prisma/prisma.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';
import { LoginRepository } from './infrastructure/login.repository';

@Module({
  imports: [RedisModule, CustomerModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    PrismaService,
    LoginRepository,
    JwtService,
    SessionService,
  ],
  exports: [LoginService],
})
export class LoginModule {}
