import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { BookingEntity } from '../domain/customer.booking.entity';
import { IBooking } from '../application/type/customer.interface';
@Injectable()
export class CustomerBookingRepository
  implements IRepository<Booking | string, unknown, unknown, null, string>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: BookingEntity,
    _?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<string> {
    const client = tx ?? this.prisma;
    await client.booking.createMany({
      data: data.getData(),
    });
    return 'Success';
  }

  async findOne(id: string): Promise<Booking | null> {
    const result = await this.prisma.booking.findFirst({
      where: { id: id },
    });
    return result;
  }

  async findMany(data: IBooking): Promise<Booking[]> {
    const startTime = new Date(data.time);
    const endTime = new Date(data.time);
    endTime.setHours(endTime.getHours() + 1);
    const existing = await this.prisma.booking.findMany({
      where: {
        customer_detail_id: data.customerDetailId,
        time: {
          gte: startTime,
          lt: endTime,
        },
      },
    });
    return existing;
  }

  async delete(id: string, secondId: string): Promise<string> {
    await this.prisma.booking.deleteMany({
      where: {
        id: { in: [id, secondId] },
      },
    });
    return 'Success';
  }
}
