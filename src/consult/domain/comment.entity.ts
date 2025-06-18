import { ConsultComment } from '@prisma/client';

export class CommentEntity {
  constructor(private readonly data: ConsultComment) {}

  getData(): ConsultComment {
    return this.data;
  }
}
