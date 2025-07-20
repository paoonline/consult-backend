import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import {
  NotificationInput,
  NotificationWithTokens,
} from '../application/dto/notification.input';

@Injectable()
export class NotificationRepository
  implements
    IRepository<
      ConsultNotification, //return
      NotificationInput, //params
      null,
      null,
      ConsultNotification //create return
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ConsultNotification[]> {
    const notification = await this.prisma.consultNotification.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        noti_date: true,
        is_push_noti: true,
        consult_transaction_id: true,
        // device_token_id: true,
        consultTransaction: {
          select: {
            id: true,
            // Add other specific fields you want from ConsultTransaction here
          },
        },
      },
    });
    return notification;
  }

  async create(data: NotificationInput): Promise<ConsultNotification> {
    return this.prisma.consultNotification.create({
      data: {
        title: data.title,
        consult_transaction_id: data.consult_transaction_id,
        // device_token_id: data.device_token_id ?? '',
        description: data.description,
        noti_date: data.noti_date,
      },
    });
  }

  async findOne(id: string): Promise<ConsultNotification> {
    const notification = await this.prisma.consultNotification.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        noti_date: true,
        is_push_noti: true,
        consult_transaction_id: true,
        // device_token_id: true,
        consultTransaction: {
          select: {
            id: true,
            // Add other specific fields you want from ConsultTransaction here
          },
        },
      },
      where: {
        id,
      },
    });
    return notification as ConsultNotification;
  }

  async findMany(): Promise<ConsultNotification[]> {
    const noti = await this.prisma.consultNotification.findMany({
      where: { is_push_noti: false },
      // select: { device_token_id: true },
    });
    return noti;
  }

  async updateMany(): Promise<number> {
    const noti = await this.prisma.consultNotification.updateMany({
      where: { is_push_noti: false },
      data: { is_push_noti: true },
    });
    return noti.count;
  }

  async updatePushStatus(notificationId: string): Promise<void> {
    await this.prisma.consultNotification.update({
      where: { id: notificationId },
      data: {
        is_push_noti: true,
      },
    });
  }

  async findDeviceTokens(notificationId: string): Promise<string[]> {
    const notification: NotificationWithTokens | null =
      await this.prisma.consultNotification.findUnique({
        where: { id: notificationId },
        include: {
          deviceTokens: {
            where: { active: true },
          },
        },
      });

    if (!notification) {
      throw new Error('Notification not found');
    }

    const result: string[] = (
      notification.deviceTokens as { token: string }[]
    ).map((token) => token.token);

    return result;
  }
}
