import { Injectable } from '@nestjs/common';
import { RedisService } from '../Redis/redis.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  async logout(key: string): Promise<void> {
    await this.redisService.removeKey(key);
  }

  async checkUserOnline(email: string): Promise<string | null> {
    return await this.redisService.getValue(`online:${email}`);
  }

  getAllUserOnline(key: string): Promise<Record<string, any>> {
    return this.redisService.getAllKey(key);
  }

  validatePassword(userPassword: string, customerPassword: string) {
    return bcrypt.compare(userPassword, customerPassword);
  }

  async hashPassword(password: string, length: number): Promise<string> {
    const hash = await bcrypt.hash(password, length);
    return hash;
  }

  async setUserOnline(email: string) {
    await this.redisService.setValueString(
      `online:${email}`,
      'true',
      'EX',
      7200,
    );
  }
}
