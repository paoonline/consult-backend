import { Module } from '@nestjs/common';

import { SessionService } from 'src/services/Session/session.service';
import { CreateBookingUseCase } from './application/use-cases/booking/create-booking.use-case';
import { DeleteBookingUseCase } from './application/use-cases/booking/delete-booking.use-case';
import { CreateCustomerUseCase } from './application/use-cases/customer/create-customer.usecase';
import { DeleteCustomerUseCase } from './application/use-cases/customer/delete-customer.usecase';
import { FindAllCustomersUseCase } from './application/use-cases/customer/find-all-customers.usecase';
import { FindFirstCustomerUseCase } from './application/use-cases/customer/find-first-customer.usecase';
import { FindOneCustomerUseCase } from './application/use-cases/customer/find-one-customer.usecase';
import { UpdateCustomerUseCase } from './application/use-cases/customer/update-customer.usecase';
import { CreateCustomerDetailUseCase } from './application/use-cases/customerDetail/create-customer-detail.usecase';
import { FindOneCustomerDetailUseCase } from './application/use-cases/customerDetail/find-one-customer-detail.usecase';
import { UpdateCustomerRateUseCase } from './application/use-cases/customerDetail/update-customer-rate.usecase';
import { CustomerController } from './customer.controller';
import { CustomerBookingRepository } from './infrastructure/customer.booking.repository';
import { CustomerDetailRepository } from './infrastructure/customer.detail.repository';
import { CustomerReponsesitory } from './infrastructure/customer.repository';
import { CustomerWorker } from './infrastructure/worker/customer.worker';
@Module({
  controllers: [CustomerController],
  providers: [
    SessionService,
    CustomerReponsesitory,
    // SkillService,
    CustomerWorker,
    CustomerDetailRepository,
    // KafkaService,
    CustomerBookingRepository,

    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
    FindOneCustomerUseCase,
    CreateCustomerUseCase,
    FindAllCustomersUseCase,

    FindFirstCustomerUseCase,

    CreateBookingUseCase,
    DeleteBookingUseCase,
    FindOneCustomerDetailUseCase,
    CreateCustomerDetailUseCase,
    UpdateCustomerRateUseCase,
  ],

  exports: [FindFirstCustomerUseCase],
})
export class CustomerModule {}
