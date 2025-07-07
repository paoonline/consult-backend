import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';

import { SkillModule } from 'src/skillMap/skill-map.module';
import { CustomerService } from './application/customer.service';
import { CustomerWorker } from './application/customer.worker';
import { CustomerDetailService } from './application/customerDetail.service';
import { CreateBookingUseCase } from './application/use-cases-booking/create-booking.use-case';
import { DeleteBookingUseCase } from './application/use-cases-booking/delete-booking.use-case';
import { CustomerController } from './customer.controller';
import { CustomerBookingRepository } from './infrastructure/customer.booking.repository';
import { CustomerDetailRepository } from './infrastructure/customer.detail.repository';
import { CustomerRepository } from './infrastructure/customer.repository';
@Module({
  imports: [RedisModule, SkillModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    SessionService,
    CustomerRepository,
    // SkillService,
    CustomerWorker,
    CustomerDetailRepository,
    CustomerDetailService,
    // KafkaService,
    CustomerBookingRepository,

    CreateBookingUseCase,
    DeleteBookingUseCase,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
