import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class HealthCronService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      console.log('[HealthCron] DB is alive');
    } catch (error) {
      console.error('[HealthCron] DB check failed:', error);
    }
  }
}
