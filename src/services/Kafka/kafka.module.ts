// src/kafka/kafka.module.ts
import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
