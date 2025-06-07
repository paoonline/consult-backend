import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { ConsultCommentDto } from './application/dto/consult.comment.dto';
import { ConsultDto } from './application/dto/consult.dto';
import { ConsultNoteDto } from './application/dto/consult.note.dto';
// import { ConsultNotificationDto } from './application/dto/consult.noti.dto';
import { ConsultCommentService } from './application/services/consult.comment.service';
import { ConsultNoteService } from './application/services/consult.note.service';
// import { ConsultNotiService } from './services/consult.noti.service';
import { ConsultService } from './application/services/consult.service';

@Controller('/consult')
export class ConsultController {
  constructor(
    private readonly consultService: ConsultService,
    private readonly noteService: ConsultNoteService,
    private readonly commentService: ConsultCommentService,
    // private readonly consultNotiService: ConsultNotiService
  ) 
  {}

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
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCounsultTransaction(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  @Get('/consult-all/:customerId/:consultId')
  @UseGuards(JwtAuthGuard)
  async getCounsultTransactionById(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('consultId') consultId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const consult = await this.consultService.findMany(customerId, consultId);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: consult,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  @Patch(':customerId/:consultId')
  @UseGuards(JwtAuthGuard)
  async meeting(
    @Res() res: Response,
    @Param('customerId') customerId: string,
    @Param('consultId') consultId: string,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const meeting = await this.consultService.meeting(customerId, consultId);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Meeting successful',
        data: meeting,
      });
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
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
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
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
      const comment = await this.commentService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: comment,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
      const comment = await this.commentService.findOne(commentId);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: comment,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
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
      const comment = await this.commentService.create(data);
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Create successful',
        data: comment,
      });
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }

  // @Post('/notification')
  // @UseGuards(JwtAuthGuard)
  // async createNotification(
  //   @Res() res: Response,
  //   @Body() data: ConsultNotificationDto,
  // ): Promise<Response<any, Record<string, any>>> {
  //   try {
  //     const notification = await this.consultNotiService.create(data);
  //     // Send a successful response with the token
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'Create successful',
  //       data: notification,
  //     });
  //   } catch (error) {
  //     // Handle errors, for example, invalid credentials
  //     return res.status(400).json({
  //       status: 400,
  //       message: error.message,
  //       data: '',
  //     });
  //   }
  // }

  // @Get('/notification/:notificationId')
  // @UseGuards(JwtAuthGuard)
  // async getNotificationByid(
  //   @Res() res: Response,
  //   @Param('notificationId') notificationId: string,
  // ): Promise<Response<any, Record<string, any>>> {
  //   try {
  //     const notification = await this.consultNotiService.findByNotificationId(notificationId);
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'successful',
  //       data: notification,
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: error.message,
  //       data: '',
  //     });
  //   }
  // }

  // @Get('/notification')
  // @UseGuards(JwtAuthGuard)
  // async getAllNotification(
  //   @Res() res: Response,
  // ): Promise<Response<any, Record<string, any>>> {
  //   try {
  //     const notification = await this.consultNotiService.findAll();
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'successful',
  //       data: notification,
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: error.message,
  //       data: '',
  //     });
  //   }
  // }
}