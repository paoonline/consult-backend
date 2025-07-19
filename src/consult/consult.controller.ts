import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { ConsultCommentDto } from './application/dto/consult.comment.dto';
import { ConsultDto } from './application/dto/consult.dto';
import { ConsultNoteDto } from './application/dto/consult.note.dto';
import { ConsultNoteService } from './application/services/consult.note.service';
import { ConsultService } from './application/services/consult.service';
import { CreateConsultCommentUseCase } from './application/use-cases/comment/create-consult-comment.use-case';
import { FindAllConsultCommentsUseCase } from './application/use-cases/comment/find-all-consult-comments.use-case';
import { FindOneConsultCommentUseCase } from './application/use-cases/comment/find-one-consult-comment.use-case';

@Controller('/consult')
export class ConsultController {
  constructor(
    private readonly consultService: ConsultService,
    private readonly noteService: ConsultNoteService,
    private readonly createConsultCommentUseCase: CreateConsultCommentUseCase,
    private readonly findAllConsultCommentsUseCase: FindAllConsultCommentsUseCase,
    private readonly findOneConsultCommentUseCase: FindOneConsultCommentUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Headers('authorization') authHeader: string,
    @Res() res: Response,
    @Body() data: ConsultDto,
  ): Promise<Response<any, Record<string, any>>> {
    const token = authHeader?.replace('Bearer ', '');
    try {
      const consult = await this.consultService.create(data, token);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: consult,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAllCounsultTransaction(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findAll(id);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get('/consult-all/:customerId')
  @UseGuards(JwtAuthGuard)
  async getCounsultTransactionById(
    @Res() res: Response,
    @Param('customerId') customerId?: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findMany(customerId);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Patch(':consultId')
  @UseGuards(JwtAuthGuard)
  async meeting(
    @Res() res: Response,
    @Param('consultId') consultId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const meeting = await this.consultService.update(consultId);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Meeting successful',
        data: meeting,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get('/note')
  @UseGuards(JwtAuthGuard)
  async getAllNotes(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const note = await this.noteService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: note,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get('/note/:noteId')
  @UseGuards(JwtAuthGuard)
  async getNoteByid(
    @Res() res: Response,
    @Param('noteId') noteId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const note = await this.noteService.findOne(noteId);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: note,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Post('/note')
  @UseGuards(JwtAuthGuard)
  async createNote(
    @Res() res: Response,
    @Body() data: ConsultNoteDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const note = await this.noteService.create(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: note,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get('/comment')
  @UseGuards(JwtAuthGuard)
  async getAllComment(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const comment = await this.findAllConsultCommentsUseCase.execute();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: comment,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Get('/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  async getCommentByid(
    @Res() res: Response,
    @Param('commentId') commentId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const comment =
        await this.findOneConsultCommentUseCase.execute(commentId);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: comment,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }

  @Post('/comment')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Res() res: Response,
    @Body() data: ConsultCommentDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const comment = await this.createConsultCommentUseCase.execute(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: comment,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }
}
