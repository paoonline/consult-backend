import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';

import { PrismaService } from 'prisma/prisma.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';
import { CreateLoginRecordUseCase } from './application/use-cases/create-login-record.use-case';
import { FindAllLoginLogsUseCase } from './application/use-cases/find-all-login-logs.use-case';
import { FindOneLoginLogUseCase } from './application/use-cases/find-one-login-log.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { LoginRepository } from './infrastructure/login.repository';

@Module({
  imports: [RedisModule, CustomerModule],
  controllers: [LoginController],
  providers: [
    LogoutUseCase,
    FindOneLoginLogUseCase,
    FindAllLoginLogsUseCase,
    LoginUseCase,
    CreateLoginRecordUseCase,
    PrismaService,
    LoginRepository,
    JwtService,
    SessionService,
  ],
  exports: [],
})
export class LoginModule {}
