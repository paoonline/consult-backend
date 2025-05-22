import { Injectable } from '@nestjs/common';
import { ConsultNotification } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultNotificationDto } from '../dto/consult.noti.dto';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { chunkArray } from 'src/utils/array';
@Injectable()
export class ConsultNotiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService) { }

  async createNoti(
    data: ConsultNotificationDto,
  ): Promise<ConsultNotification | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultNotification;

    return this.prisma.consultNotification.create({
      data: snakeData,
    });
  }

  async pushNoti(): Promise<ConsultNotification[] | null> {
    const pendingNotis = await this.prisma.consultNotification.findMany({
      where: { is_push_noti: false }, select: { device_token: true },
    });
    if (pendingNotis.length > 0) {
      const tokens = pendingNotis.map(r => r.device_token)

      const tokenChunks = chunkArray(tokens, 500)
      await this.prisma.consultNotification.updateMany({
        where: { is_push_noti: false },
        data: { is_push_noti: true },
      })

      // push 500 token per request
      for (const chunk of tokenChunks) {
        await this.firebaseService.sendMulticastNotification(chunk, 'test', 'test');
      }
    }
    return pendingNotis as ConsultNotification[];
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
      where: {
        id,
      },
      include: {
        consultTransaction: true,
      },
    });
    return camelcaseKeys(
      notification as ConsultNotification,
    ) as unknown as ConsultNotification;
  }
}
