import { Injectable } from '@nestjs/common';
import { RedisService } from '../Redis/redis.service';

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  async logout(key: string): Promise<void> {
    this.redisService.removeKey(key);
  }

  async checkUserOnline(email: string): Promise<string> {
    return this.redisService.getValue(`online:${email}`);
  }

  async setUserOnline(
    email: string
  ) {
    this.redisService.setValueString(
      `online:${email}`, 'true', 'EX', 7200
    );
  }
}
