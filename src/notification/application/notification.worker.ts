import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/services/Redis/redis.module';
import { BaseWorker } from 'src/services/Worker/BaseWorker';
import { NotificationDto } from './dto/notification.dto';
import { NotificationService } from './notification.service';
// import { NotificationDto } from "src/consult/application/dto/consult.noti.dto";

@Injectable()
export class NotificationWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly notificationService: NotificationService,
  ) {
    super('NotificationQueue', redis, async (job) => {
      const { id, description, title, device_token } = job.data as {
        id: string;
        description: string;
        title: string;
        device_token: string;
      };

      const data = {
        consultTransactionId: id,
        description: description,
        title: title,
        deviceToken: device_token,
      } as NotificationDto;
      await this.notificationService.create(data);
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 NotificationWorker initialized');
  }
}

// import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
// import Redis from "ioredis";
// import { CustomerRepository } from "src/customer/infrastructure/customer.repository";
// import { REDIS_CLIENT } from "src/services/Redis/redis.module";
// import { BaseWorker } from "src/services/Worker/BaseWorker";
// import { NotificationRepository } from "../infrastructure/notification.repository";
// import { ConsultNotification } from "@prisma/client";
// import { NotificationService } from "./notification.service";
// import { ConsultNotificationDto } from "src/consult/application/dto/consult.noti.dto";
// import { KafkaService } from "src/services/Kafka/kafka.service";

// @Injectable()
// export class NotificationWorker implements OnModuleInit {
//   constructor(

//     private readonly notificationService: NotificationService,
//     private readonly kafkaService: KafkaService,
//   ) {
//     // super('NotificationQueue', redis, async (job) => {
//     //   const { id, description, title, device_token } = job.data;
//     // });
//   }

//   async onModuleInit() {
//     await this.kafkaService.consumeMessages('NotificationQueue', (msg) => {
//       console.log('Received:', msg);
//       let msgData = msg

//       let data = {
//         consultTransactionId: msgData.id,
//         description: msgData.description,
//         title: msgData.title,
//         deviceToken: msgData.device_token
//     }  as ConsultNotificationDto
//     this.notificationService.create(data)

//     });
//     // Optionally log something
//     console.log('👷 NotificationWorker initialized');
//   }
// }
