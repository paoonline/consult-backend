import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { BookingEntity } from '../domain/entity/customer.booking.entity';
import { CustomerBookingRepository } from '../infrastructure/customer.booking.repository';
import { IBooking } from './type/customer.interface';

@Injectable()
export class CustomerBookingService
  implements IRepository<IBooking | string, unknown, unknown, unknown, string>
{
  constructor(
    private readonly customerBookingRepository: CustomerBookingRepository,
  ) {}
  async create(
    data: IBooking[],
    _?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<string> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as BookingEntity[];

    //check Double booking detected
    const conflictResults = await Promise.all(
      data.map(async (item) => {
        const existing = await this.customerBookingRepository.findMany(item);
        return {
          customerDetailId: item.customerDetailId as string,
          existing,
        };
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
    //

    const result = await this.customerBookingRepository.create(
      createFactory(snakeData, BookingEntity as keyof object, tx),
    );
    return result;
  }

  async findOne(id: string): Promise<IBooking | null> {
    const result = await this.customerBookingRepository.findOne(id);
    return camelcaseKeys(result as Booking) as IBooking;
  }

  async delete(id: string, secondId: string): Promise<string> {
    const result = await this.customerBookingRepository.delete(id, secondId);
    return result;
  }
}
