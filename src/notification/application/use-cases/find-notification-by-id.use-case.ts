// application/use-cases/find-notification-by-id.use-case.ts
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../infrastructure/notification.repository';
import { NotificationDto } from '../dto/notification.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindNotificationByIdUseCase {
  constructor(private readonly notiRepository: NotificationRepository) {}

  async execute(id: string): Promise<NotificationDto> {
    const noti = await this.notiRepository.findOne(id);
    return camelcaseKeys(noti) as NotificationDto;
  }
}
