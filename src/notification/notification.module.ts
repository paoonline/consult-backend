
import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { FirebaseService } from "src/services/Firebase/firebase.service";
import { NotificationService } from "./application/notification.service";
import { NotificationRepository } from "./infrastructure/notification.repository";
import { NotificationWorker } from "./application/notification.worker";
import { RedisModule } from "src/services/Redis/redis.module";

@Module({
  imports: [RedisModule],
  providers: [NotificationService, PrismaService, NotificationRepository, FirebaseService, NotificationWorker],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}