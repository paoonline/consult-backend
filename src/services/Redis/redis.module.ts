// redis.module.ts
import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
export const REDIS_CLIENT = 'REDIS_CLIENT';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis(
          {
            host: 'localhost', // or your Redis host
            port: 6379,
            maxRetriesPerRequest: null, // ✅ Required by BullMQ
          }
        ); // Customize connection if needed
      },
    },
    RedisService, // Your custom service using redis
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
