import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { BookingEntity } from 'src/customer/domain/customer.booking.entity';
import { CustomerBookingRepository } from 'src/customer/infrastructure/customer.booking.repository';

import { createFactory } from 'src/utils/factory';
import { IBooking } from '../../dto/customer.dto';

@Injectable()
export class CreateBookingUseCase {
  constructor(private readonly bookingRepo: CustomerBookingRepository) {}

  async execute(
    data: IBooking[],
    tx?: Prisma.TransactionClient,
  ): Promise<string> {
    const conflictResults = await Promise.all(
      data.map(async (item) => {
        const existing = await this.bookingRepo.findMany(item);
        return { customerDetailId: item.customerDetailId as string, existing };
      }),
    );

    const conflicts = conflictResults
      .filter((r) => r.existing.length > 0)
      .reduce(
        (acc, cur) => {
          acc[cur.customerDetailId] = cur.existing;
          return acc;
        },
        {} as Record<string, IBooking[]>,
      );

    if (Object.keys(conflicts).length > 0) {
      throw new Error(
        `Double booking detected for: ${Object.keys(conflicts).join(', ')}`,
      );
    }

    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as BookingEntity[];
    const result = await this.bookingRepo.create(
      createFactory(snakeData, BookingEntity as keyof object, tx),
    );
    return result;
  }
}
