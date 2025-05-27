import { Module } from '@nestjs/common';
import { LoginService } from './application/login.service';
import { LoginController } from './login.controller';

import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { LoginRepository } from './infrastructure/login.repository';
import { SessionService } from 'src/services/Session/session.service';

@Module({
  imports: [RedisModule],
  controllers: [LoginController],
  providers: [LoginService, PrismaService, LoginRepository, JwtService, SessionService],
  exports: [LoginService],
})
export class LoginModule {}