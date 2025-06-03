// customer.worker.ts
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';
import { CustomerRepository } from '../infrastructure/customer.repository';
import { BaseWorker } from 'src/services/Worker/BaseWorker';

@Injectable()
export class CustomerWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly customerRepo: CustomerRepository,
  ) {
    super('customerDetailQueue', redis, async (job) => {
      const { id, rate } = job.data;
      await this.customerRepo.updateDetailCustomer(id, rate);
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 CustomerWorker initialized');
  }
}
