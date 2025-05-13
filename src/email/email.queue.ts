// email.queue.ts
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';

//producer
@Injectable()
export class EmailQueue {
  private queue: Queue;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    this.queue = new Queue('emailQueue', {
      connection: this.redis,
    });
  }

  async addEmailJob(data: { to: string; subject: string; body: string }) {
    await this.queue.add('sendEmail', data,{
      removeOnComplete: true,        // ✅ Auto-delete completed jobs
      removeOnFail: { count: 5 }, // ❌ Keep only last 5 failed attempts
    });
  }
}
