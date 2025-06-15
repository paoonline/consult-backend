import { Booking } from "@prisma/client";

export class BookingEntity {
  constructor(
    private readonly data: Booking,
  ) {}

  getData(): Booking {
    return this.data;
  }
}
