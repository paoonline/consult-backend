
import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { FirebaseService } from "src/services/Firebase/firebase.service";
import { NotificationService } from "./application/notification.service";
import { NotificationRepository } from "./infrastructure/notification.repository";

@Module({
  providers: [NotificationService, PrismaService, NotificationRepository, FirebaseService],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}