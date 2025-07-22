import { NotificationInput } from 'src/notification/application/dto/notification.input';

export class NotificationEntity {
  constructor(private readonly data: NotificationInput) {
    // if (this.isExpired()) {
    //   throw new Error('Noti date is expire');
    // }
  }

  private getDaysSinceNoti(): number {
    const now = new Date();
    const notiDate = this.data?.noti_date;
    if (!notiDate) return 0;
    const diff = now.getTime() - notiDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // private hasValidDeviceToken(): boolean {
  //   if (!this?.data?.device_token_id?.length) return false;
  //   return this.data.device_token_id.length > 10; // example validation
  // }

  private isExpired(): boolean {
    return this.getDaysSinceNoti() > 30;
  }

  isPushable(): boolean {
    return !this.isExpired();
  }

  getData(): NotificationInput {
    return this.data;
  }
}
