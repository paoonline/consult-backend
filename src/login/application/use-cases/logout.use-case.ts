import { Injectable } from '@nestjs/common';
import { SessionService } from 'src/services/Session/session.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly sessionService: SessionService) {}

  async execute(key: string): Promise<void> {
    await this.sessionService.logout(key);
  }
}
