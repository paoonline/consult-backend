import { Injectable, Inject } from "@nestjs/common";
import { Queue } from "bullmq";
import Redis from "ioredis";
import { REDIS_CLIENT } from "../Redis/redis.module";

@Injectable()
export class QueueJob {
  private queues: Map<string, Queue> = new Map();

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  // Get or create a queue
  private getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, {
        connection: this.redis,
      });
      this.queues.set(queueName, queue);
    }
    return this.queues.get(queueName) as Queue;
  }

  // Generic method to add any job
  async addJob<T>(queueName: string, jobName: string, data: T): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.add(jobName, data, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
      removeOnFail: { count: 5 },
    });
  }
}
