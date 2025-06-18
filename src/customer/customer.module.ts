import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';

import { SkillModule } from 'src/skill/skill.module';
import { CustomerService } from './application/customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './infrastructure/customer.repository';
import { SkillService } from 'src/skill/application/skill.service';
import { CustomerWorker } from './application/customer.worker';
import { CustomerDetailRepository } from './infrastructure/customer.detail.repository';
import { CustomerDetailService } from './application/customerDetail.service';
import { CustomerBookingService } from './application/customer.booking.service';
import { CustomerBookingRepository } from './infrastructure/customer.booking.repository';
@Module({
  imports: [RedisModule, SkillModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    SessionService,
    CustomerRepository,
    SkillService,
    CustomerWorker,
    CustomerDetailRepository,
    CustomerDetailService,
    // KafkaService,
    CustomerBookingService,
    CustomerBookingRepository,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
