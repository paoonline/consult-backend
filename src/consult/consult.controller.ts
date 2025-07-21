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
import { getErrorMessage } from 'src/utils/error';

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

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Headers('authorization') authHeader: string,
    @Body() data: ConsultDto,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    try {
      const consult = await this.createConsultTransactionUseCase.execute(
        data,
        token,
      );
      return {
        status: 200,
        message: 'Create successful',
        data: consult,
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        code: 400,
        message: getErrorMessage(error),
        error: 'Custom Error Label',
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAllCounsultTransaction(@Param('id') id: string) {
    try {
      const consult = await this.findAllConsultTransactionsUseCase.execute(id);
      return {
        status: 200,
        message: 'successful',
        data: consult,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/consult-all/:customerId')
  @UseGuards(JwtAuthGuard)
  async getCounsultTransactionById(@Param('customerId') customerId?: string) {
    try {
      const consult =
        await this.findManyConsultTransactionsUseCase.execute(customerId);
      return {
        status: 200,
        message: 'successful',
        data: consult,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Patch(':consultId')
  @UseGuards(JwtAuthGuard)
  async meeting(@Param('consultId') consultId: string) {
    try {
      const meeting =
        await this.updateMeetingConsultTransactionsUseCase.execute(consultId);
      return {
        status: 200,
        message: 'Meeting successful',
        data: meeting,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/note')
  @UseGuards(JwtAuthGuard)
  async getAllNotes() {
    try {
      const note = await this.findAllNotesUseCase.execute();
      return {
        status: 200,
        message: 'successful',
        data: note,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/note/:noteId')
  @UseGuards(JwtAuthGuard)
  async getNoteByid(@Param('noteId') noteId: string) {
    try {
      const note = await this.findOneNoteUseCase.execute(noteId);
      return {
        status: 200,
        message: 'successful',
        data: note,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Post('/note')
  @UseGuards(JwtAuthGuard)
  async createNote(@Body() data: ConsultNoteDto) {
    try {
      const note = await this.createNoteUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: note,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/comment')
  @UseGuards(JwtAuthGuard)
  async getAllComment() {
    try {
      const comment = await this.findAllConsultCommentsUseCase.execute();
      return {
        status: 200,
        message: 'successful',
        data: comment,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Get('/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  async getCommentByid(@Param('commentId') commentId: string) {
    try {
      const comment =
        await this.findOneConsultCommentUseCase.execute(commentId);
      return {
        status: 200,
        message: 'successful',
        data: comment,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }

  @Post('/comment')
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() data: ConsultCommentDto) {
    try {
      const comment = await this.createConsultCommentUseCase.execute(data);
      return {
        status: 200,
        message: 'Create successful',
        data: comment,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
