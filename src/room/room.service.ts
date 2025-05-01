import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './room.dto';
import { RoomDetail } from './room-detail.entity';
import { Customer } from 'src/customers/customer.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomDetail)
    private readonly roomDetailRepository: Repository<RoomDetail>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['room_detail', 'customer'] });
  }

  async findOne(id: string): Promise<Room | null> {
    return this.roomRepository.findOne({
      where: { id },
      relations: ['room_detail', 'customer'],
    });
  }

  async update(
    id: string,
    updateRoomDto: Partial<CreateRoomDto>,
  ): Promise<Room | null> {
    // First, find the room by its ID and load the related RoomDetail
    let room = await this.roomRepository.findOne({
      where: { id },
      relations: ['room_detail', 'customer'], // Ensure room_detail is loaded
    });
    if (!room) {
      return null; // Return null if the room isn't found
    }

    // If room_detail is being updated, handle it separately
    if (updateRoomDto.room_detail) {
      // Update the room_detail part
      const roomDetail = room.room_detail;


      // Update only the fields that are provided in the request
      if (updateRoomDto.room_detail.room_number) {
        roomDetail.room_number = updateRoomDto.room_detail.room_number;
      }
      if (updateRoomDto.room_detail.room_status) {
        roomDetail.room_status = updateRoomDto.room_detail.room_status;
      }

       this.roomDetailRepository.save(roomDetail); // Save the updated RoomDetail entity separately
    }

    if (updateRoomDto.customer_id) {
      const customer = await this.customerRepository.findOne({
        where: { id: updateRoomDto.customer_id },
      });

      if (customer) {
        room.customer = customer;
      }
    } else {
      room.customer = null
    }

    if (updateRoomDto.end_time || updateRoomDto.book_time) {
      room.book_time = updateRoomDto.book_time ?? null
      room.end_time = updateRoomDto.end_time ?? null
    }

    await this.roomRepository.save(room);
    return this.roomRepository.findOne({ where: { id: room.id }, relations: ['room_detail', 'customer'] });
  }

  async delete(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
