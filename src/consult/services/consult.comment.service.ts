import { ConsultComment } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultCommentDto } from '../application/consult.comment.dto';
import { CommentRepository } from '../infrastructure/comment.repository';
import { CustomerQueue } from '../application/queue/customer.queue';
import { IRepository } from 'src/utils/respository';

@Injectable()
export class ConsultCommentService implements IRepository<ConsultCommentDto, ConsultCommentDto, null, null, ConsultComment> {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly customerQueue: CustomerQueue
    ) { }

    async create(
        data: ConsultCommentDto,
    ): Promise<ConsultComment> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as ConsultComment;
        
        const comment = await this.commentRepository.create(snakeData)
        const avgResult = await this.commentRepository.aggregate(comment.customer_detail_id)

        // event driven to update rate
        this.customerQueue.addCustomerDetailJob({id: comment.customer_detail_id, rate:avgResult})
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
