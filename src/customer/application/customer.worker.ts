// customer.worker.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';
import { BaseWorker } from 'src/services/Worker/BaseWorker';
import { CustomerDetailRepository } from '../infrastructure/customer.detail.repository';

@Injectable()
export class CustomerWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly customerDetailRepository: CustomerDetailRepository,
  ) {
    super('customerDetailQueue', redis, async (job) => {
      const { id, rate } = job.data;
      await this.customerDetailRepository.update(id, rate);
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 CustomerWorker initialized');
  }
}
