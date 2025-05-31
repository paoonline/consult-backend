// customer.worker.ts
import { OnModuleInit, Injectable, Inject } from '@nestjs/common';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';
import { CustomerRepository } from '../infrastructure/customer.repository';

//consumer
@Injectable()
export class CustomerWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly customerRepository: CustomerRepository
  ) {}

  onModuleInit() {
    const worker = new Worker(
      'customerDetailQueue',
      async (job) => {
        const { id, rate } = job.data;
        this.customerRepository.updateDetailCustomer(id, rate)
      },
      { connection: this.redis },
    );

    worker.on('completed', (job) => {
      console.log(`✅ Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ Job ${job?.id} failed:`, err.message);
    });
  }
}
