import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from '../application/notification.service';

@Injectable()
export class BatchNotificationService {
  private readonly logger = new Logger(BatchNotificationService.name);
  constructor(
    private readonly notiService: NotificationService

  ) {}

  // @Cron('55 11 * * *')
  @Cron('55 * * * *')
  async handleBatchCheck() {
    this.logger.log('Running batch check  every at 55 minute ');
    this.notiService.pushNoti()
  }
}
