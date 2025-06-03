import { ConsultNotification } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { ConsultNotificationDto } from 'src/consult/application/dto/consult.noti.dto';
import { IRepository } from 'src/utils/respository';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { chunkArray } from 'src/utils/array';
import { NotificationRepository } from '../infrastructure/notification.repository';

interface IPushNoti {
    pushNoti(): Promise<ConsultNotification[]>
}

@Injectable()
export class NotificationService
    implements
    IRepository<
        ConsultNotificationDto,
        ConsultNotificationDto,
        null,
        null,
        ConsultNotificationDto
    >, IPushNoti {
    constructor(
        private readonly notiRepository: NotificationRepository,
        private readonly firebaseService: FirebaseService
    ) { }
    async create(data: ConsultNotificationDto): Promise<ConsultNotificationDto> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as ConsultNotification;
        const noti = await this.notiRepository.create(snakeData);
        return camelcaseKeys(noti);
    }

    async findAll(): Promise<ConsultNotificationDto[]> {
        const noti = await this.notiRepository.findAll();
        return noti.map((item) => camelcaseKeys(item));
    }

    async findOne(id: string): Promise<ConsultNotificationDto> {
        const noti = await this.notiRepository.findOne(id);
        return camelcaseKeys(noti);
    }

    async pushNoti(): Promise<ConsultNotification[]> {
        const pendingNotis = await this.notiRepository.findMany()
        if (pendingNotis.length > 0) {
            const tokens = pendingNotis.map(r => r.device_token)

            const tokenChunks = chunkArray(tokens, 500)
            await this.notiRepository.updateMany()

            // push 500 token per request
            for (const chunk of tokenChunks) {
                await this.firebaseService.sendMulticastNotification(chunk, 'test', 'test');
            }
        }
        return pendingNotis
    }
}
