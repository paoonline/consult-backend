import { Booking } from '@prisma/client';

export class BookingEntity {
  constructor(private readonly data: Booking[]) {}

  private validateTime(): boolean {
    const arrTime = new Date(this.data[0].time).getTime();
    const arrTime1 = new Date(this.data[1].time).getTime();

    const diff = Math.abs(arrTime - arrTime1);
    return diff < 60000;
  }

  assertValidTime(): void {
    if (!this.validateTime()) throw new Error('Time not validate');
  }

  getData(): Booking[] {
    return this.data;
  }
}
