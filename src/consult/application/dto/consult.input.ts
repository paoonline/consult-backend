import { TimeLimitType } from '@prisma/client';

export interface IConsultInput {
  time_list: TimeLimitType;
  customer_id: string;
  consult_id: string;
  start_date: Date;
  end_date: Date;
}
