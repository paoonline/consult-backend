// email.worker.ts
import { OnModuleInit, Injectable, Inject } from '@nestjs/common';
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';

//consumer
@Injectable()
export class EmailWorker implements OnModuleInit {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  onModuleInit() {
    const worker = new Worker(
      'emailQueue',
      async (job) => {
        console.log(job.id) // count email send
        const { to, subject, body } = job.data;
        console.log(`📨 Sending email to ${to}: ${subject}`);
        // Simulate email sending...
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
