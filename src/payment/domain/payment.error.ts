export class PaymentSuspiciousError extends Error {
  constructor() {
    super('Payment is suspicious');
    this.name = 'PaymentSuspiciousError';
  }
}

export class PriceBelowZeroError extends Error {
  constructor() {
    super('Price must be positive');
    this.name = 'PriceBelowZeroError';
  }
}
