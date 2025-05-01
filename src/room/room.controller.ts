import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  UseGuards,
  Param,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { RoomDetailService } from './room-detail.service';

type UpdateRoomDto = CreateRoomDto
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomDetailService: RoomDetailService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Res() res: Response,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const roomDetail = await this.roomDetailService.create(
        createRoomDto.room_detail,
      );
      const newRoom = {
        ...createRoomDto,
        room_detail: roomDetail, // Assign saved RoomDetail entity
      };
      const room = await this.roomService.create(newRoom);
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: room,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRooms(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const room = await this.roomService.findAll();
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: room,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }


  // booking hotel
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatedRoom(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateRoomDto: Partial<UpdateRoomDto>,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const updatedRoom = await this.roomService.update(id, updateRoomDto);

      if (!updatedRoom) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Room not found',
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: updatedRoom,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: '',
      });
    }
  }
}
