import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
// import { KafkaService } from 'src/services/Kafka/kafka.service';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.use-case';
import { PushNotificationUseCase } from './application/use-cases/push-notification.use-case';
import { NotificationRepository } from './infrastructure/notification.repository';
import { NotificationController } from './notification.controller';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationRepository,
    FirebaseService,
    CreateNotificationUseCase,
    PushNotificationUseCase,
    // KafkaService,
  ],
  exports: [PushNotificationUseCase],
})
export class NotificationModule {}
