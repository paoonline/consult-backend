import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { PaymentService } from "./application/payment.service";
import { PaymentRepository } from "./infrastructure/payment.repository";
import { PaymentController } from "./payment.controller";


@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PrismaService, PaymentRepository, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}