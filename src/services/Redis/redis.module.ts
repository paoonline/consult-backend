// redis.module.ts
import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
export const REDIS_CLIENT = 'REDIS_CLIENT';
import 'dotenv/config';

const redisUrl = process.env.REDIS_URL ?? '';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis({
          host: 'localhost', // or your Redis host
          port: 6379,
          maxRetriesPerRequest: null, // ✅ Required by BullMQ
        }); // Customize connection if needed
        // return new Redis(redisUrl, {
        //   maxRetriesPerRequest: null,
        // });
      },
    },
    RedisService, // Your custom service using redis
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
