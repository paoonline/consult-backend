import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../prisma/prisma.module';
import { BatchService } from './batch/batch.service';
import { ConsultModule } from './consult/consult.module';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { SessionModule } from './services/Session/session.module';
import { JwtStrategy } from './validate/jwt.strategy';

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
