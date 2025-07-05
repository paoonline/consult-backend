import { NotificationInput } from '../application/notification.type';

export class NotificationEntity {
  constructor(private readonly data: NotificationInput) {
    if (this.checkNotiDateExpire()) {
      throw new Error('Noti date is expire');
    }
  }

  getDaysSincePayment(): number {
    const now = new Date();
    const diff = now.getTime() - (this.data?.noti_date?.getTime() || 0);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  checkNotiDateExpire(): boolean {
    return this.getDaysSincePayment() > 30;
  }

  getData(): NotificationInput {
    return this.data;
  }
}
