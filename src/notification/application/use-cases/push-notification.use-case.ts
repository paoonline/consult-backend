import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import { NotificationEntity } from 'src/notification/domain/notification.entity';
import { NotificationRepository } from 'src/notification/infrastructure/notification.repository';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { chunkArray } from 'src/utils/array';

// application/use-cases/push-notification.use-case.ts
@Injectable()
export class PushNotificationUseCase {
  constructor(
    private readonly notiRepository: NotificationRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async execute(): Promise<ConsultNotification[]> {
    const pendingNotis = await this.notiRepository.findMany();

    const pushableEntities = pendingNotis
      .map((raw) => new NotificationEntity(raw))
      .filter((entity) => entity.isPushable());

    for (const noti of pushableEntities) {
      const { title, id = '', description } = noti.getData();
      const tokens = await this.notiRepository.findDeviceTokens(id);

      const tokenChunks = chunkArray(tokens, 500);
      for (const chunk of tokenChunks) {
        await this.firebaseService.sendMulticastNotification(
          chunk,
          title,
          description,
        );
      }

      await this.notiRepository.updatePushStatus(id);
    }

    return pendingNotis;
  }
}
