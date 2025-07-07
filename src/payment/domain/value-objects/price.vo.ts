import { PriceBelowZeroError } from '../payment.error';

// domain/value-objects/price.vo.ts
export class Price {
  constructor(private readonly value: number) {
    if (value < 0) throw new PriceBelowZeroError();
  }

  isGreaterThan(amount: number): boolean {
    return this.value > amount;
  }

  getValue(): number {
    return this.value;
  }
}
