import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export class ConsultNotiService {
  constructor(private readonly prisma: PrismaService) { }

  async createNoti(
    data: ConsultNotification,
  ): Promise<ConsultNotification | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultNotification;

    return this.prisma.consultNotification.create({
      data: snakeData,
    });
  }

  async findAll(): Promise<ConsultNotification[]> {
    const notification = await this.prisma.consultNotification.findMany({
      include: {
        consultTransaction: true,
      },
    });
    return notification.map((item) =>
      camelcaseKeys(item),
    ) as unknown as ConsultNotification[];
  }

  async findByNotificationId(id: string): Promise<ConsultNotification> {
    const notification = await this.prisma.consultNotification.findUnique({
      where: { id },
      include: {
        consultTransaction: true,
      },
    });
    return camelcaseKeys(
      notification as unknown as ConsultNotification,
    ) as unknown as ConsultNotification;
  }
}
