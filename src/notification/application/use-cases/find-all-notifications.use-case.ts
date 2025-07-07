// application/use-cases/find-all-notifications.use-case.ts
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../infrastructure/notification.repository';
import { NotificationDto } from '../dto/notification.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindAllNotificationsUseCase {
  constructor(private readonly notiRepository: NotificationRepository) {}

  async execute(): Promise<NotificationDto[]> {
    const notis = await this.notiRepository.findAll();
    return notis.map((item) => camelcaseKeys(item)) as NotificationDto[];
  }
}
