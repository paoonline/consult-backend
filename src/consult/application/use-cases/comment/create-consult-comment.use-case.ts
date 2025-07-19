// application/use-cases/comment/create-consult-comment.use-case.ts

import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { ConsultCommentDto } from 'src/consult/application/dto/consult.comment.dto';
import { CommentRepository } from 'src/consult/infrastructure/comment.repository';
import { QueueJob } from 'src/services/Queue/queueJob';
import { PrismaService } from 'prisma/prisma.service';
import { createFactory } from 'src/utils/factory';
import { CommentEntity } from 'src/consult/domain/entity/comment.entity';
import { ConsultComment } from '.prisma/client';

@Injectable()
export class CreateConsultCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly queueJob: QueueJob,
    private readonly prisma: PrismaService,
  ) {}

  async execute(data: ConsultCommentDto): Promise<ConsultComment> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultComment;

    return this.prisma.$transaction(async (tx) => {
      const entity = createFactory(snakeData, CommentEntity);
      if (entity.isHighRating()) {
        throw new Error('This is a good comment');
      }

      if (entity.isRecentComment()) {
        throw new Error('This comment is fresh');
      }

      const comment = await this.commentRepository.create(
        entity,
        undefined,
        tx,
      );

      const avgResult = await this.commentRepository.aggregate(
        comment.customer_detail_id,
        tx,
      );

      // open redis first -> refactor
      void this.queueJob.addJob('customerDetailQueue', 'sendCustomerDetail', {
        id: comment.customer_detail_id,
        rate: avgResult,
      });

      // event driven to update rate
      // await this.kafkaService.sendMessage('customerDetailQueue', JSON.stringify({ id: comment.customer_detail_id, rate: avgResult }));

      return comment;
    });
  }
}
