import { Module } from '@nestjs/common';
import { ApiModule } from 'src/services/Api/api.module';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { QueueJob } from 'src/services/Queue/queueJob';
import { ConsultNoteService } from './application/services/consult.note.service';
import { ConsultService } from './application/services/consult.service';
import { CreateConsultCommentUseCase } from './application/use-cases/comment/create-consult-comment.use-case';
import { FindAllConsultCommentsUseCase } from './application/use-cases/comment/find-all-consult-comments.use-case';
import { FindOneConsultCommentUseCase } from './application/use-cases/comment/find-one-consult-comment.use-case';
import { ConsultController } from './consult.controller';
import { CommentRepository } from './infrastructure/comment.repository';
import { ConsultRepository } from './infrastructure/consult.repository';
import { NoteRepository } from './infrastructure/note.repository';
// import { KafkaService } from 'src/services/Kafka/kafka.service';

@Module({
  imports: [ApiModule],
  controllers: [ConsultController],
  providers: [
    CreateConsultCommentUseCase,
    FindAllConsultCommentsUseCase,
    FindOneConsultCommentUseCase,
    ConsultService,
    ConsultNoteService,
    FirebaseService,
    NoteRepository,
    CommentRepository,
    ConsultRepository,
    QueueJob,
    // KafkaService,
  ],
  exports: [],
})
export class ConsultModule {}
