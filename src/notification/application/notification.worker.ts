import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";
import { CustomerRepository } from "src/customer/infrastructure/customer.repository";
import { REDIS_CLIENT } from "src/services/Redis/redis.module";
import { BaseWorker } from "src/services/Worker/BaseWorker";
import { NotificationRepository } from "../infrastructure/notification.repository";
import { ConsultNotification } from "@prisma/client";

@Injectable()
export class NotificationWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly notificationRepository: NotificationRepository,
  ) {
    super('NotificationQueue', redis, async (job) => {
      const { id, description, title, device_token } = job.data;

      let data = {
          consult_transaction_id: id,
          description: description,
          title: title,
          device_token: device_token
      }  as ConsultNotification
      await this.notificationRepository.create(data)
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 NotificationWorker initialized');
  }
}