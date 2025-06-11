// kafka.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  public producer = this.kafka.producer();
  public consumer = this.kafka.consumer({ groupId: 'my-group' });

  async onModuleInit() {

    await this.producer.connect();
    await this.consumer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      
      messages: [{ value: message, partition: 1 }],
    });
  }

  async consumeMessages(topic: string, callback: (message: any) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('partition', message.offset)
        console.log(topic)
        const value = message.value?.toString();
        try {
          const parsed = JSON.parse(value || '');
          callback(parsed);
        } catch (err) {
          console.error('Kafka parse error:', err);
        }
      },
    });
  }
}
