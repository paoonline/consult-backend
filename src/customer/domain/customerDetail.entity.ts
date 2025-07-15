import { ICustomerDetailEntity } from './customer.repository.interface';

export class CustomerDetailEntity {
  constructor(private readonly data: ICustomerDetailEntity) {}

  get customerId(): string {
    return this.data.customer_id;
  }

  get rate(): number {
    return this.data.rate ?? 0;
  }

  get price(): number {
    return this.data.price ?? 0;
  }

  // get bookings() {
  //   return this.data.bookings || [];
  // }

  // get comments() {
  //   return this.data.comments || [];
  // }

  getData(): ICustomerDetailEntity {
    return this.data;
  }

  // Example business logic
  // hasBookings(): boolean {
  //   return this.bookings.length > 0;
  // }

  // hasComments(): boolean {
  //   return this.comments.length > 0;
  // }

  isRated(): boolean {
    return (this.data.rate ?? 0) < 5;
  }

  // totalSpent(): number {
  //   return this.price * this.bookings.length;
  // }
}
