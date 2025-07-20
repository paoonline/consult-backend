import { TimeLimitType } from '@prisma/client';
import { ConsultInput } from 'src/consult/application/dto/consult.dto';

export class ConsultBuilder {
  private data: Partial<ConsultInput> = {};

  setFromCreate(obj: ConsultInput) {
    const { timeList, customerId, consultId, startDate, endDate } = obj;

    this.data.timeList = timeList;
    this.data.customerId = customerId;
    this.data.consultId = consultId;
    this.data.startDate = startDate;
    this.data.endDate = endDate;

    return this;
  }

  setTimeList(timeList: TimeLimitType): this {
    this.data.timeList = timeList;
    return this;
  }

  setCustomerId(customerId: string): this {
    if (!customerId) throw new Error('CustomerId is required');
    this.data.customerId = customerId;
    return this;
  }

  setConsultId(consultId: string): this {
    if (!consultId) throw new Error('ConsultId is required');
    this.data.consultId = consultId;
    return this;
  }

  setEndDate(endDate: Date): this {
    if (!(endDate instanceof Date)) throw new Error('Invalid endDate');
    this.data.endDate = endDate;
    return this;
  }

  setStartDate(startDate: Date): this {
    if (!(startDate instanceof Date)) throw new Error('Invalid startDate');
    this.data.startDate = startDate;
    return this;
  }

  setIsPass(isPass: boolean): this {
    this.data.isPass = isPass;
    return this;
  }

  setCustomerDetailId(customerDetailId: string): this {
    if (!customerDetailId) throw new Error('CustomerDetailId is required');
    this.data.customerDetailId = customerDetailId;
    return this;
  }

  setConsultDetailId(consultDetailId: string): this {
    if (!consultDetailId) throw new Error('ConsultDetailId is required');
    this.data.consultDetailId = consultDetailId;
    return this;
  }

  build(): ConsultInput {
    const {
      timeList,
      customerId,
      consultId,
      endDate,
      startDate,
      // customerDetailId,
      // consultDetailId,
    } = this.data;

    if (
      !timeList ||
      !customerId ||
      !consultId ||
      !endDate ||
      !startDate
      // !customerDetailId ||
      // !consultDetailId
    ) {
      throw new Error('Missing required fields in ConsultDto');
    }

    return this.data as ConsultInput;
  }
}
