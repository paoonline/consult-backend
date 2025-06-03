import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../prisma/prisma.module';
import { ConsultModule } from './consult/consult.module';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { SessionModule } from './services/Session/session.module';
import { JwtStrategy } from './validate/jwt.strategy';
import { NotificationModule } from './notification/notification.module';
import { BatchNotificationService } from './notification/batch/batch.notification.service';

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
    NotificationModule
  ],
  providers: [BatchNotificationService, JwtStrategy],
})
export class AppModule {}
