import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { NotificationEntity } from 'src/notification/domain/notification.entity';
import { NotificationRepository } from 'src/notification/infrastructure/notification.repository';
import { createFactory } from 'src/utils/factory';
import { NotificationDto } from '../dto/notification.dto';

// application/use-cases/create-notification.use-case.ts
@Injectable()
export class CreateNotificationUseCase {
  constructor(private readonly notiRepository: NotificationRepository) {}

  async execute(data: NotificationDto): Promise<NotificationDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultNotification;

    const notiFactory = createFactory(snakeData, NotificationEntity);

    const noti = await this.notiRepository.create(notiFactory.getData());
    return camelcaseKeys(noti);
  }
}
