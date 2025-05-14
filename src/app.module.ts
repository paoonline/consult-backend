import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch/batch.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { CustomerModule } from './customer/customer.module';

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
    CustomerModule
  ],
  providers: [BatchService],
})
export class AppModule {}
