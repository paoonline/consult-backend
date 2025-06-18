// common/bullmq/base.worker.ts
import { OnModuleDestroy } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';

export class BaseWorker implements OnModuleDestroy {
  private worker: Worker;

  constructor(
    private readonly queueName: string,
    private readonly redis: Redis,
    private readonly handler: (job: Job) => Promise<any>,
  ) {
    this.worker = new Worker(this.queueName, this.handler, {
      connection: this.redis,
    });

    this.worker.on('completed', (job) => {
      console.log(`✅ Job ${job.id} from ${this.queueName} completed`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(
        `❌ Job ${job?.id} from ${this.queueName} failed:`,
        err.message,
      );
    });
  }

  async onModuleDestroy() {
    if (this.worker) {
      await this.worker.close();
    }
  }
}
