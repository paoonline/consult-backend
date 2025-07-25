import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { IConsultInput } from 'src/consult/application/dto/consult.input';
import { truncateTime } from 'src/utils/time';

export class ConsultEntity {
  constructor(private readonly data: IConsultInput) {
    this.validate();
    this.data.start_date = truncateTime(this.data.start_date);
    this.data.end_date = truncateTime(this.data.end_date);
  }

  private validate(): void {
    if (!this.isTimeValid()) {
      throw new NotFoundException('Start date must be before end date');
    }

    if (!this.isWithin30Days()) {
      throw new BadRequestException(
        'Consultation cannot be more than 30 days long',
      );
    }

    if (this.isSelfConsulting()) {
      throw new ConflictException('Cannot create consult with yourself');
    }

    if (!this.isCheckDateBookMatchDateNow()) {
      throw new ConflictException('Start date must be before date now');
    }
  }

  private isTimeValid(): boolean {
    const start = new Date(this.data.start_date);
    const end = new Date(this.data.end_date);
    return start.getTime() < end.getTime();
  }

  private isWithin30Days(): boolean {
    const start = new Date(this.data.start_date);
    const end = new Date(this.data.end_date);
    const diffInDays =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 30;
  }

  private isSelfConsulting(): boolean {
    return this.data.customer_id === this.data.consult_id;
  }

  private isCheckDateBookMatchDateNow(): boolean {
    const start = new Date(this.data.start_date);
    return start.getTime() >= new Date().getTime();
  }

  getData(): IConsultInput {
    return this.data;
  }
}
