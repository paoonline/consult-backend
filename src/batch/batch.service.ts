import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConsultNotiService } from 'src/consult/services/consult.noti.service';
@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(
    private readonly consultNotiService: ConsultNotiService

  ) {}

  // @Cron('55 11 * * *')
  @Cron('55 * * * *')
  async handleBatchCheck() {
    this.logger.log('Running batch check  every at 55 minute ');
    this.consultNotiService.pushNoti()
  }
}
