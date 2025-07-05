import { ConsultNotification } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';

import { FirebaseService } from 'src/services/Firebase/firebase.service';
// import { chunkArray } from 'src/utils/array';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { NotificationEntity } from '../domain/notification.entity';
import { NotificationRepository } from '../infrastructure/notification.repository';
import { NotificationDto } from './dto/notification.dto';

interface IPushNoti {
  pushNoti(): Promise<ConsultNotification[]>;
}

@Injectable()
export class NotificationService
  implements
    IRepository<NotificationDto, NotificationDto, null, null, NotificationDto>,
    IPushNoti
{
  constructor(
    private readonly notiRepository: NotificationRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async create(data: NotificationDto): Promise<NotificationDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultNotification;

    const notiFactory = createFactory(snakeData, NotificationEntity);

    const noti = await this.notiRepository.create(notiFactory.getData());
    return camelcaseKeys(noti);
  }

  async findAll(): Promise<NotificationDto[]> {
    const noti = await this.notiRepository.findAll();
    return noti.map((item) => camelcaseKeys(item)) as NotificationDto[];
  }

  async findOne(id: string): Promise<NotificationDto> {
    const noti = await this.notiRepository.findOne(id);
    return camelcaseKeys(noti) as NotificationDto;
  }

  async pushNoti(): Promise<ConsultNotification[]> {
    const pendingNotis = await this.notiRepository.findMany();
    // if (pendingNotis.length > 0) {
    //   const tokens = pendingNotis.map((r) => r.device_token_id as string);

    // const pushableEntities = pendingNotis
    //   .map((raw) => new NotificationEntity(raw))
    //   .filter((entity) => entity.isPushable());

    // if (pendingNotis.length > 0) {
    //   const tokens = pushableEntities.map(
    //     (e) => e.getData().device_token || '',
    //   );
    //   const tokenChunks = chunkArray(tokens || [], 500);
    //   await this.notiRepository.updateMany();

    //   // push 500 token per request
    //   for (const chunk of tokenChunks) {
    //     await this.firebaseService.sendMulticastNotification(
    //       chunk,
    //       'test',
    //       'test',
    //     );
    //   }
    // }
    return pendingNotis;
  }
}
