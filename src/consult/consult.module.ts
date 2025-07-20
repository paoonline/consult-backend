import { Module } from '@nestjs/common';
import { ApiModule } from 'src/services/Api/api.module';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { QueueJob } from 'src/services/Queue/queueJob';
import { CreateConsultCommentUseCase } from './application/use-cases/comment/create-consult-comment.use-case';
import { FindAllConsultCommentsUseCase } from './application/use-cases/comment/find-all-consult-comments.use-case';
import { FindOneConsultCommentUseCase } from './application/use-cases/comment/find-one-consult-comment.use-case';
import { CreateConsultTransactionUseCase } from './application/use-cases/consult/create-consult-transaction.usecase';
import { FindAllConsultTransactionsUseCase } from './application/use-cases/consult/find-all-consult-transactions.usecase';
import { FindManyConsultTransactionsUseCase } from './application/use-cases/consult/find-many-consult-transactions.usecase';
import { UpdateMeetingConsultTransactionsUseCase } from './application/use-cases/consult/update-meeting-consult-transactions.usecase';
import { CreateNoteUseCase } from './application/use-cases/note/create-note.usecase';
import { FindAllNotesUseCase } from './application/use-cases/note/find-all-notes.usecase';
import { FindOneNoteUseCase } from './application/use-cases/note/find-one-note.usecase';
import { ConsultController } from './consult.controller';
import { CommentRepository } from './infrastructure/comment.repository';
import { ConsultRepository } from './infrastructure/consult.repository';
import { NoteRepository } from './infrastructure/note.repository';
// import { KafkaService } from 'src/services/Kafka/kafka.service';

@Module({
  imports: [ApiModule],
  controllers: [ConsultController],
  providers: [
    UpdateMeetingConsultTransactionsUseCase,
    CreateConsultTransactionUseCase,
    FindAllConsultTransactionsUseCase,
    FindManyConsultTransactionsUseCase,
    CreateConsultCommentUseCase,
    FindAllConsultCommentsUseCase,
    FindOneConsultCommentUseCase,
    CreateNoteUseCase,
    FindAllNotesUseCase,
    FindOneNoteUseCase,

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
