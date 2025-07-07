// domain/value-objects/payment-date.vo.ts
export class PaymentDate {
  constructor(private readonly date: Date) {}

  getDaysSince(): number {
    const now = new Date();
    const diff = now.getTime() - this.date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  isOlderThan(days: number): boolean {
    return this.getDaysSince() > days;
  }

  getValue(): Date {
    return this.date;
  }
}
