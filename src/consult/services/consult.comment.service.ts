import { Prisma, ConsultComment } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultCommentDto } from '../dto/consult.comment';

@Injectable()
export class ConsultCommentService {
    constructor(private readonly prisma: PrismaService) { }

    async createComment(
        data: ConsultCommentDto,
    ): Promise<ConsultComment | null> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as Prisma.ConsultCommentCreateInput;

        const comment = await this.prisma.consultComment.create({
            data: snakeData,
        });

        const avgResult = await this.prisma.consultComment.aggregate({
            _avg: {
                rate: true,
            },
            where: {
                customer_detail_id: comment.customer_detail_id,
            },
        });

        await this.prisma.customerDetail.update({
            where: {
                id: comment.customer_detail_id,
            },
            data: {
                rate: Math.round(avgResult._avg.rate ?? 0),
            },
        });
        return comment
    }

    async findAll(): Promise<ConsultComment[]> {
        const comment = await this.prisma.consultComment.findMany();
        return comment.map((item) => camelcaseKeys(item)) as unknown as ConsultComment[];
    }

    async findByCommentId(id: string): Promise<ConsultComment> {
        const comment = await this.prisma.consultComment.findUnique({
            where: { id },
        });
        return camelcaseKeys(comment as unknown as ConsultComment) as unknown as ConsultComment;
    }
}
