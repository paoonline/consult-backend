import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { NotificationInput } from '../application/notification.type';

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
        device_token: true,
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
      data,
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
        device_token: true,
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
      select: { device_token: true },
    });
    return noti as ConsultNotification[];
  }

  async updateMany(): Promise<number> {
    const noti = await this.prisma.consultNotification.updateMany({
      where: { is_push_noti: false },
      data: { is_push_noti: true },
    });
    return noti.count;
  }
}
