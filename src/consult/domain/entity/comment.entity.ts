import { ConsultComment } from '@prisma/client';

export class CommentEntity {
  constructor(private readonly data: ConsultComment) {}

  getRate(): number {
    return this.data.rate;
  }

  isHighRating(): boolean {
    return this.data.rate >= 4;
  }
  isRecentComment(): boolean {
    const now = new Date();
    const diff = now.getTime() - this.data.comment_date.getTime();
    return diff < 7 * 24 * 60 * 60 * 1000; // 7 days in ms
  }

  isCommentTooLong(): boolean {
    return this.data.description.length > 200;
  }

  getData(): ConsultComment {
    return this.data;
  }
}
