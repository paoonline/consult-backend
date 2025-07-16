import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';

import { SkillModule } from 'src/skillMap/skill-map.module';
import { CustomerService } from './application/customer.service';
import { CustomerWorker } from './infrastructure/worker/customer.worker';
import { CreateBookingUseCase } from './application/use-cases/booking/create-booking.use-case';
import { DeleteBookingUseCase } from './application/use-cases/booking/delete-booking.use-case';
import { CreateCustomerDetailUseCase } from './application/use-cases/customerDetail/create-customer-detail.usecase';
import { FindOneCustomerDetailUseCase } from './application/use-cases/customerDetail/find-one-customer-detail.usecase';
import { UpdateCustomerRateUseCase } from './application/use-cases/customerDetail/update-customer-rate.usecase';
import { CustomerController } from './customer.controller';
import { CustomerBookingRepository } from './infrastructure/customer.booking.repository';
import { CustomerDetailRepository } from './infrastructure/customer.detail.repository';
import { CustomerReponsesitory } from './infrastructure/customer.repository';
@Module({
  imports: [RedisModule, SkillModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    SessionService,
    CustomerReponsesitory,
    // SkillService,
    CustomerWorker,
    CustomerDetailRepository,
    // KafkaService,
    CustomerBookingRepository,

    CreateBookingUseCase,
    DeleteBookingUseCase,
    FindOneCustomerDetailUseCase,
    CreateCustomerDetailUseCase,
    UpdateCustomerRateUseCase,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
