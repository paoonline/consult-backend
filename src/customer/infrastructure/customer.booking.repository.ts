import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { BookingEntity } from '../domain/customer.booking.entity';
@Injectable()
export class CustomerBookingRepository
  implements
  IRepository<
  Booking,
    unknown,
    unknown,
    null,
    string
  > {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: BookingEntity[], _?: string, tx?: Prisma.TransactionClient): Promise<string> {
    const client = tx ?? this.prisma;
    await client.booking.createMany({
        data: [
            data[0].getData(),
            data[1].getData()
        ],
      });
      return 'Success' 
  }

  async findOne(id: string): Promise<Booking | null> {
    const result = await this.prisma.booking.findFirst({
        where: { id: id },
    }) ;
    return result
  }

}
