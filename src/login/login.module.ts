import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { RedisModule } from 'src/services/Redis/redis.module';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from 'src/validate/jwt.strategy';
@Module({
  imports: [RedisModule],
  controllers: [LoginController],
  providers: [LoginService, PrismaService, JwtStrategy],
  exports: [LoginService],
})
export class LoginModule {}