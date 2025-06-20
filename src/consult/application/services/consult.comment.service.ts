import { ConsultComment } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { CommentEntity } from 'src/consult/domain/comment.entity';
import { CommentRepository } from 'src/consult/infrastructure/comment.repository';
import { QueueJob } from 'src/services/Queue/queueJob';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { ConsultCommentDto } from '../dto/consult.comment.dto';
// import { KafkaService } from 'src/services/Kafka/kafka.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConsultCommentService
  implements
    IRepository<
      ConsultCommentDto,
      ConsultCommentDto,
      null,
      null,
      ConsultComment
    >
{
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly queueJob: QueueJob,
    // private readonly kafkaService: KafkaService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: ConsultCommentDto): Promise<ConsultComment> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as ConsultComment;

    const result = await this.prisma.$transaction(async (tx) => {
      const comment = await this.commentRepository.create(
        createFactory(snakeData, CommentEntity),
        undefined,
        tx,
      );
      const avgResult = await this.commentRepository.aggregate(
        comment.customer_detail_id,
        tx,
      );
      void this.queueJob.addJob('customerDetailQueue', 'sendCustomerDetail', {
        id: comment.customer_detail_id,
        rate: avgResult,
      });
      return comment;
    });

    // event driven to update rate
    // await this.kafkaService.sendMessage('customerDetailQueue', JSON.stringify({ id: comment.customer_detail_id, rate: avgResult }));

    return result;
  }

  async findAll(): Promise<ConsultCommentDto[]> {
    const comment = await this.commentRepository.findAll();
    return comment.map((r) => camelcaseKeys(r)) as ConsultCommentDto[];
  }

  async findOne(id: string): Promise<ConsultCommentDto> {
    const comment = await this.commentRepository.findOne(id);
    return camelcaseKeys(comment);
  }
}
