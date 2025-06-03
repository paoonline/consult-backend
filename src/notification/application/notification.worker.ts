import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";
import { CustomerRepository } from "src/customer/infrastructure/customer.repository";
import { REDIS_CLIENT } from "src/services/Redis/redis.module";
import { BaseWorker } from "src/services/Worker/BaseWorker";
import { NotificationRepository } from "../infrastructure/notification.repository";
import { ConsultNotification } from "@prisma/client";
import { NotificationService } from "./notification.service";
import { ConsultNotificationDto } from "src/consult/application/dto/consult.noti.dto";

@Injectable()
export class NotificationWorker extends BaseWorker implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT) redis: Redis,
    private readonly notificationService: NotificationService
  ) {
    super('NotificationQueue', redis, async (job) => {
      const { id, description, title, device_token } = job.data;

      let data = {
          consultTransactionId: id,
          description: description,
          title: title,
          deviceToken: device_token
      }  as ConsultNotificationDto
      await this.notificationService.create(data)
    });
  }

  onModuleInit() {
    // Optionally log something
    console.log('👷 NotificationWorker initialized');
  }
}