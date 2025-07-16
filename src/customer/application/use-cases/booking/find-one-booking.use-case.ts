import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { CustomerBookingRepository } from 'src/customer/infrastructure/customer.booking.repository';
import { IBooking } from '../../type/customer.interface';

@Injectable()
export class FindOneBookingUseCase {
  constructor(private readonly bookingRepo: CustomerBookingRepository) {}

  async execute(id: string): Promise<IBooking | null> {
    const result = await this.bookingRepo.findOne(id);
    return camelcaseKeys(result as Booking) as IBooking;
  }
}
