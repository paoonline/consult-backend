import { ConsultNotification, Prisma } from '@prisma/client';

export type NotificationInput = {
  id?: string;
  title: string;
  consult_transaction_id: string;
  // device_token_id: string;
  description: string;
  noti_date?: Date;
};
export interface IPushNoti {
  pushNoti(): Promise<ConsultNotification[]>;
}

export type NotificationWithTokens = Prisma.ConsultNotificationGetPayload<{
  include: { deviceTokens: true };
}>;
