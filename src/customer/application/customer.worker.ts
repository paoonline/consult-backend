// customer.worker.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';
import { BaseWorker } from 'src/services/Worker/BaseWorker';
import { UpdateCustomerRateUseCase } from './use-cases/customerDetail/update-customer-rate.usecase';

@Injectable()
export class CustomerWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly updateCustomerRateUseCase: UpdateCustomerRateUseCase,
  ) {
    super('customerDetailQueue', redis, async (job) => {
      const { id, rate } = job.data as { id: string; rate: number };
      await this.updateCustomerRateUseCase.execute(id, rate);
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 CustomerWorker initialized');
  }
}
