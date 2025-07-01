import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis.Redis) {}
  async getValue(key: string) {
    const raw = await this.redis.get(key); // string
    try {
      const parsed = JSON.parse(raw || '') as string;
      console.log('Parsed object:', parsed);
      return parsed;
    } catch {
      // console.error('Error parsing JSON from Redis:', err);
      return null;
    }
  }

  async setValue(key: string, value: Record<string, any>) {
    await this.redis.set(key, JSON.stringify(value));
  }

  async saddValue(key: string, value: string) {
    await this.redis.sadd(key, value);
  }

  async setValueString(
    key: string,
    value: string,
    typeTime: 'EX',
    expire: number,
  ) {
    await this.redis.set(key, JSON.stringify(value), typeTime, expire);
  }

  async removeKey(key: string) {
    await this.redis.del(key);
  }

  async removeKeySrem(key: string) {
    await this.redis.srem('online:users', key);
  }

  async getAllKey(key: string): Promise<Record<string, any>> {
    return this.redis.smembers(key);
  }
}
