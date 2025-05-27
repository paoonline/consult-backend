import { Injectable } from '@nestjs/common';
import { RedisService } from '../Redis/redis.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  async logout(key: string): Promise<void> {
    this.redisService.removeKey(key);
  }

  checkUserOnline(email: string): Promise<string> {
    return this.redisService.getValue(`online:${email}`);
  }

  getAllUserOnline(key:string):Promise<Record<string, any>> {
    return this.redisService.getAllKey(key)
  }

  validatePassword(userPassword: string, customerPassword: string) {
    return bcrypt.compare(userPassword, customerPassword)
  }

  setUserOnline(
    email: string
  ) {
    this.redisService.setValueString(
      `online:${email}`, 'true', 'EX', 7200
    );
  }
}
