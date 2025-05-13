// email.module.ts
import { Module } from '@nestjs/common';
import { EmailQueue } from './email.queue';
import { EmailWorker } from './email.worker';
import { RedisModule } from 'src/services/Redis/redis.module';
import { EmailController } from './email.controller';

@Module({
  imports: [RedisModule],
  providers: [EmailQueue, EmailWorker],
  controllers: [EmailController],
  exports: [EmailQueue],
})
export class EmailModule {}
