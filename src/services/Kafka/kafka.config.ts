// src/kafka/kafka.config.ts
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'my-app',
      brokers: ['localhost:9092'], // replace with your broker
    },
    consumer: {
      groupId: 'my-consumer-group', // each group gets a copy of the message
    },
  },
};
