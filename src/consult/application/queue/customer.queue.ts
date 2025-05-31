// customer.queue.ts
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';

//producer
@Injectable()
export class CustomerQueue {
  private queue: Queue;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    this.queue = new Queue('customerDetailQueue', {
      connection: this.redis,
    });    
  }

  async addCustomerDetailJob(data:{id: string, rate: number}) {
    await this.queue.add('sendCustomerDetail', data, {
      removeOnComplete: true,        // ✅ Auto-delete completed jobs
      removeOnFail: { count: 5 }, // ❌ Keep only last 5 failed attempts
    });
  }
}
