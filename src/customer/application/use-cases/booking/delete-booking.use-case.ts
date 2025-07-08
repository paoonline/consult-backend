import { Injectable } from '@nestjs/common';
import { CustomerBookingRepository } from 'src/customer/infrastructure/customer.booking.repository';

@Injectable()
export class DeleteBookingUseCase {
  constructor(private readonly bookingRepo: CustomerBookingRepository) {}

  async execute(id: string, secondId: string): Promise<string> {
    return await this.bookingRepo.delete(id, secondId);
  }
}
