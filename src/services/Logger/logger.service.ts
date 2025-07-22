// src/common/logger/logger.service.ts
import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger = new Logger('HTTP');

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
