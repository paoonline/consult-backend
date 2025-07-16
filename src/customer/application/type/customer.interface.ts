export interface IConsultComment {
  description: string;
  commentDate: Date;
  rate: number;
  consultTransactionId: string;
  customerDetailId: string;
}
export interface IBooking {
  time: Date;
  customerDetailId?: string;
}

export interface ISkill {
  name: string;
}
