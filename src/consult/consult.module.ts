import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConsultController } from './consult.controller';
import { ConsultService } from './services/consult.service';
import { ConsultNoteService } from './services/consult.note.service';
import { ConsultCommentService } from './services/consult.comment.service';
import { ConsultNotiService } from './services/consult.noti.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { CommentRepository } from './infrastructure/comment.repository';
import { CustomerQueue } from './application/queue/customer.queue';
import { NoteRepository } from './infrastructure/note.repository';

@Module({
  imports: [RedisModule],
  controllers: [ConsultController],
  providers: [
    ConsultService,
    PrismaService,
    ConsultNoteService,
    ConsultCommentService,
    ConsultNotiService,
    FirebaseService,
    NoteRepository,
    CommentRepository,
    CustomerQueue
  ],
  exports: [ConsultNotiService],
})
export class ConsultModule {}
