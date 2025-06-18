import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { RedisModule } from '../Redis/redis.module';

@Module({
  imports: [RedisModule],
  exports: [SessionService],
  providers: [SessionService],
})
export class SessionModule {}
