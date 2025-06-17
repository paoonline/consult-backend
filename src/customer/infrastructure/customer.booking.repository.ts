import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { BookingEntity } from '../domain/customer.booking.entity';
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

  async delete(id: string, secondId: string): Promise<string> {
    await this.prisma.booking.deleteMany({
      where: {
        id: { in: [id, secondId] },
      },
    });
    return 'Success';
  }
}
