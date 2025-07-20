import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { ConsultCommentDto } from './application/dto/consult.comment.dto';
import { ConsultDto } from './application/dto/consult.dto';
import { ConsultNoteDto } from './application/dto/consult.note.dto';
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

@Controller('/consult')
export class ConsultController {
  constructor(
    private readonly updateMeetingConsultTransactionsUseCase: UpdateMeetingConsultTransactionsUseCase,
    private readonly createConsultTransactionUseCase: CreateConsultTransactionUseCase,
    private readonly findAllConsultTransactionsUseCase: FindAllConsultTransactionsUseCase,
    private readonly findManyConsultTransactionsUseCase: FindManyConsultTransactionsUseCase,

    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly findAllNotesUseCase: FindAllNotesUseCase,
    private readonly findOneNoteUseCase: FindOneNoteUseCase,

    private readonly createConsultCommentUseCase: CreateConsultCommentUseCase,
    private readonly findAllConsultCommentsUseCase: FindAllConsultCommentsUseCase,
    private readonly findOneConsultCommentUseCase: FindOneConsultCommentUseCase,
  ) {}

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error occurred';
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Headers('authorization') authHeader: string,
    @Body() data: ConsultDto,
  ) {
    try {
      const token = authHeader?.replace('Bearer ', '');
      return await this.createConsultTransactionUseCase.execute(data, token);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAllCounsultTransaction(@Param('id') id: string) {
    try {
      return await this.findAllConsultTransactionsUseCase.execute(id);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/consult-all/:customerId')
  @UseGuards(JwtAuthGuard)
  async getCounsultTransactionById(@Param('customerId') customerId: string) {
    try {
      return await this.findManyConsultTransactionsUseCase.execute(customerId);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Patch(':consultId')
  @UseGuards(JwtAuthGuard)
  async meeting(@Param('consultId') consultId: string) {
    try {
      return await this.updateMeetingConsultTransactionsUseCase.execute(
        consultId,
      );
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/note')
  @UseGuards(JwtAuthGuard)
  async getAllNotes() {
    try {
      return await this.findAllNotesUseCase.execute();
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/note/:noteId')
  @UseGuards(JwtAuthGuard)
  async getNoteByid(@Param('noteId') noteId: string) {
    try {
      return await this.findOneNoteUseCase.execute(noteId);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Post('/note')
  @UseGuards(JwtAuthGuard)
  async createNote(@Body() data: ConsultNoteDto) {
    try {
      return await this.createNoteUseCase.execute(data);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/comment')
  @UseGuards(JwtAuthGuard)
  async getAllComment() {
    try {
      return await this.findAllConsultCommentsUseCase.execute();
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Get('/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  async getCommentByid(@Param('commentId') commentId: string) {
    try {
      return await this.findOneConsultCommentUseCase.execute(commentId);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }

  @Post('/comment')
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() data: ConsultCommentDto) {
    try {
      return await this.createConsultCommentUseCase.execute(data);
    } catch (error) {
      throw new BadRequestException(this.getErrorMessage(error));
    }
  }
}
