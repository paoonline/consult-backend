// application/use-cases/comment/find-one-consult-comment.use-case.ts

import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/consult/infrastructure/comment.repository';
import { ConsultCommentDto } from 'src/consult/application/dto/consult.comment.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindOneConsultCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: string): Promise<ConsultCommentDto> {
    const comment = await this.commentRepository.findOne(id);
    return camelcaseKeys(comment);
  }
}
