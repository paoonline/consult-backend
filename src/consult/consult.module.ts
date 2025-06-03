import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { QueueJob } from 'src/services/Queue/queueJob';
import { RedisModule } from 'src/services/Redis/redis.module';
import { ConsultController } from './consult.controller';
import { CommentRepository } from './infrastructure/comment.repository';
import { NoteRepository } from './infrastructure/note.repository';
import { ConsultCommentService } from './services/consult.comment.service';
import { ConsultNoteService } from './services/consult.note.service';
import { ConsultService } from './services/consult.service';

@Module({
  imports: [RedisModule],
  controllers: [ConsultController],
  providers: [
    ConsultService,
    PrismaService,
    ConsultNoteService,
    ConsultCommentService,
    FirebaseService,
    NoteRepository,
    CommentRepository,
    QueueJob,
  ],
  exports: [],
})
export class ConsultModule {}
