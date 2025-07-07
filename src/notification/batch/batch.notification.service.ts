import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PushNotificationUseCase } from '../application/use-cases/push-notification.use-case';

@Injectable()
export class BatchNotificationService {
  private readonly logger = new Logger(BatchNotificationService.name);
  constructor(
    private readonly pushNotificationUseCase: PushNotificationUseCase,
  ) {}

  // @Cron('55 11 * * *')
  @Cron('55 * * * *')
  async handleBatchCheck() {
    this.logger.log('Running batch check  every at 55 minute ');
    await this.pushNotificationUseCase.execute();
  }
}
