import { Injectable } from '@nestjs/common';
import { ConsultComment, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CommentEntity } from '../domain/entity/comment.entity';

@Injectable()
export class CommentRepository
  implements
    IRepository<
      ConsultComment,
      CommentEntity,
      null,
      null,
      ConsultComment,
      number
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ConsultComment[]> {
    const comment = await this.prisma.consultComment.findMany();
    return comment;
  }

  async create(
    data: CommentEntity,
    _?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ConsultComment> {
    const client = tx ?? this.prisma;
    const comment = await client.consultComment.create({
      data: data.getData(),
    });
    return comment;
  }

  async findOne(id: string): Promise<ConsultComment> {
    const comment = await this.prisma.consultComment.findFirst({
      where: { id },
    });
    return comment as ConsultComment;
  }

  async aggregate(id: string, tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx ?? this.prisma;
    const avgResult = await client.consultComment.aggregate({
      _avg: {
        rate: true,
      },
      where: {
        customer_detail_id: id,
      },
    });
    return avgResult._avg.rate ?? 0;
  }
}
