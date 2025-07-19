import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import 'dotenv/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthController } from './app.controller';
import { AppGateway } from './app.gateway';
import { ConsultModule } from './consult/consult.module';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { BatchNotificationService } from './notification/batch/batch.notification.service';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { SkillModule } from './skillMap/skill-map.module';
import { JwtStrategy } from './validate/jwt.strategy';
import { RedisModule } from './services/Redis/redis.module';
import { AppLogger } from './services/Logger/logger.service';

// require('dotenv').config();
@Module({
  controllers: [HealthController],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LoginModule,
    CustomerModule,
    ConsultModule,
    SkillModule,
    NotificationModule,
    PaymentModule,
    RedisModule,
  ],
  providers: [BatchNotificationService, JwtStrategy, AppGateway, AppLogger],
  exports: [AppLogger]
})
export class AppModule {}
