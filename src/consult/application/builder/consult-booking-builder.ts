import { BookingPayloadItem } from '../dto/consult.dto';

export class BookingPayloadBuilder {
  private customerDetailId?: string;
  private consultDetailId?: string;
  private time!: Date;
  private consultTransactionId!: string;

  setCustomerDetailId(id: string): this {
    this.customerDetailId = id;
    return this;
  }

  setConsultDetailId(id: string): this {
    this.consultDetailId = id;
    return this;
  }

  setTime(time: Date): this {
    this.time = time;
    return this;
  }

  setConsultTransactionId(id: string): this {
    this.consultTransactionId = id;
    return this;
  }

  build(): BookingPayloadItem[] {
    const payload: BookingPayloadItem[] = [];

    if (this.customerDetailId) {
      payload.push({
        customerDetailId: this.customerDetailId,
        time: this.time,
        consultTransactionId: this.consultTransactionId,
      });
    }

    if (this.consultDetailId) {
      payload.push({
        customerDetailId: this.consultDetailId,
        time: this.time,
        consultTransactionId: this.consultTransactionId,
      });
    }

    return payload;
  }
}
