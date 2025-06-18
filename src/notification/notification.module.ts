import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { KafkaService } from 'src/services/Kafka/kafka.service';
import { NotificationService } from './application/notification.service';
import { NotificationRepository } from './infrastructure/notification.repository';
import { NotificationController } from './notification.controller';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PrismaService,
    NotificationRepository,
    FirebaseService,
    KafkaService,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
