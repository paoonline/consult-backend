import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch/batch.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { CustomerModule } from './customer/customer.module';
import { ConsultModule } from './consult/consult.module';
import { JwtStrategy } from './validate/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { RedisModule } from './services/Redis/redis.module';
import { SessionModule } from './services/Session/session.module';

require('dotenv').config();
@Module({
  imports: 
  [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LoginModule,
    CustomerModule,
    ConsultModule,
    SessionModule,
  ],
  providers: [BatchService, JwtStrategy],
})
export class AppModule {}
