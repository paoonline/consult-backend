import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/consult/infrastructure/comment.repository';
import { ConsultCommentDto } from 'src/consult/application/dto/consult.comment.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindAllConsultCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(): Promise<ConsultCommentDto[]> {
    const comments = await this.commentRepository.findAll();
    return comments.map((r) => camelcaseKeys(r)) as ConsultCommentDto[];
  }
}
