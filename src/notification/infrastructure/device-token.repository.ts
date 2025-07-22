import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { DeviceTokenEntity } from '../domain/entities/device-token.entity';
import { Prisma } from '@prisma/client';
import { NotificationWithTokens } from '../application/dto/notification.input';

@Injectable()
export class DeviceTokenRepository
  implements
    IRepository<
      null,
      Prisma.DeviceTokenUncheckedCreateInput,
      null,
      null,
      DeviceTokenEntity
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.DeviceTokenUncheckedCreateInput,
  ): Promise<DeviceTokenEntity> {
    const created = await this.prisma.deviceToken.create({ data: data });

    return new DeviceTokenEntity(
      created.token,
      created.platform,
      created.customer_id,
      created.created_at,
      created.expires_at,
      created.active,
    );
  }

  async deactivateExpired(): Promise<void> {
    await this.prisma.deviceToken.updateMany({
      where: { expires_at: { lt: new Date() } },
      data: { active: false },
    });
  }

  async findByDuplicateToken(token: string): Promise<boolean> {
    const found = await this.prisma.deviceToken.findUnique({
      where: {
        token,
      },
    });
    return !!found;
  }

  async findNotificationWithDeviceTokens(
    notificationId: string,
  ): Promise<NotificationWithTokens | null> {
    const notification: NotificationWithTokens | null =
      await this.prisma.consultNotification.findUnique({
        where: { id: notificationId },
        include: {
          deviceTokens: {
            where: {
              active: true,
              expires_at: {
                lt: new Date(),
              },
            },
          },
        },
      });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }
}
