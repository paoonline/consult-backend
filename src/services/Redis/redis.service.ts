import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis.Redis) {}
  async getValue(key: string) {
    const raw = await this.redis.get(key); // string

    try {
      const parsed = JSON.parse(raw || '');
      console.log('Parsed object:', parsed);
      return parsed;
    } catch (err) {
      console.error('Error parsing JSON from Redis:', err);
      return null;
    }
  }

  async setValue(key: string, value: Record<string, any>) {
    await this.redis.set(key,  JSON.stringify(value));
  }

  async setValueString(key: string, value: string, typeTime: 'EX', expire: number) {
    this.redis.set(key,  JSON.stringify(value), typeTime, expire);
  }

  async getAllKey():Promise<Record<string, any>> {
    const stream = this.redis.scanStream({
      match: 'online:*',
    });
    let keys: Record<string, any> = {};
    stream.on('data', (resultKeys: string[]) => {
      for (const key of resultKeys) {
        keys[key.replace(/online:/, '')] = 'true'
      }

    });
    await new Promise((resolve) => stream.on('end', resolve));
    return keys
  }
}
