import { ConsultComment } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultCommentDto } from '../application/consult.comment.dto';
import { CommentRepository } from '../infrastructure/comment.repository';

@Injectable()
export class ConsultCommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commentRepository: CommentRepository
    ) { }

    async createComment(
        data: ConsultCommentDto,
    ): Promise<ConsultComment | null> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as ConsultComment;
        const comment = await this.commentRepository.create(snakeData)
        const avgResult = await this.commentRepository.aggregate(comment.customer_detail_id)

        // event driven to update rate
        await this.prisma.customerDetail.update({
            where: {
                id: comment.customer_detail_id,
            },
            data: {
                rate: Math.round(avgResult ?? 0),
            },
        });
        return comment
    }

    async findAll(): Promise<ConsultCommentDto[]> {
        const comment = await this.commentRepository.findAll()
        return comment.map((r) => camelcaseKeys(r)) as ConsultCommentDto[]
    }

    async findOne(id: string): Promise<ConsultCommentDto> {
        const comment = await this.commentRepository.findOne(id)
        return camelcaseKeys(comment)
    }
}
