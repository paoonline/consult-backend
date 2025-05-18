import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConsultController } from './consult.controller';
import { ConsultService } from './consult.service';
import { ConsultNoteService } from './services/consult.note.service';
import { ConsultCommentService } from './services/consult.comment.service';
import { ConsultNotiService } from './services/consult.noti.service';
@Module({
  controllers: [ConsultController],
  providers: [
    ConsultService,
    PrismaService,
    ConsultNoteService,
    ConsultCommentService,
    ConsultNotiService,
  ],
})
export class ConsultModule {}
