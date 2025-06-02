import { Injectable } from '@nestjs/common';
import { ConsultComment } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { ConsultCommentDtoRepository } from '../application/dto/consult.comment.dto';

@Injectable()
export class CommentRepository
  implements
  IRepository<
    ConsultComment,
    ConsultCommentDtoRepository,
    null,
    null,
    ConsultComment,
    number
  > {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<ConsultComment[]> {
    const comment = await this.prisma.consultComment.findMany();
    return comment;
  }

  async create(data: ConsultComment): Promise<ConsultComment> {
    const comment = await this.prisma.consultComment.create({
      data,
    });
    return comment;
  }

  async findOne(id: string): Promise<ConsultComment> {
    const comment = await this.prisma.consultComment.findFirst({
      where: { id },
    });
    return comment as ConsultComment;
  }

  async aggregate(id: string): Promise<number> {
    const avgResult = await this.prisma.consultComment.aggregate({
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
