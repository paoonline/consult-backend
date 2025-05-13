import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// import { InjectRepository } from '@nestjs/typeorm';
// import { LessThan, Repository } from 'typeorm';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(
    // @InjectRepository(Room)
    // private readonly roomRepository: Repository<Room>,

  ) {}

  @Cron('55 11 * * *')
  async handleBatchCheck() {
    this.logger.log('Running batch check at 11:55 AM');

  }
}
