import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from 'src/services/Firebase/firebase.service';
import { QueueJob } from 'src/services/Queue/queueJob';
import { RedisModule } from 'src/services/Redis/redis.module';
import { ConsultController } from './consult.controller';
import { CommentRepository } from './infrastructure/comment.repository';
import { NoteRepository } from './infrastructure/note.repository';
import { ConsultCommentService } from './application/services/consult.comment.service';
import { ConsultNoteService } from './application/services/consult.note.service';
import { ConsultService } from './application/services/consult.service';
import { ApiModule } from 'src/services/Api/api.module';
import { ConsultRepository } from './infrastructure/consult.repository';
// import { KafkaService } from 'src/services/Kafka/kafka.service';

@Module({
  imports: [RedisModule, ApiModule],
  controllers: [ConsultController],
  providers: [
    ConsultService,
    PrismaService,
    ConsultNoteService,
    ConsultCommentService,
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
