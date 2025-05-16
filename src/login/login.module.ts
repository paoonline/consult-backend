import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { RedisModule } from 'src/services/Redis/redis.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [RedisModule],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
  exports: [LoginService],
})
export class LoginModule {}