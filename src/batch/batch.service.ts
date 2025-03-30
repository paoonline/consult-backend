import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/room.entity';
import { RoomDetail } from 'src/room/room-detail.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomDetail)
    private readonly roomDetailRepository: Repository<RoomDetail>,
  ) {}

  @Cron('55 11 * * *')
  async handleBatchCheck() {
    this.logger.log('Running batch check at 11:55 AM');

    const currentDate = new Date();
    const roomsToUpdate = await this.roomRepository.find({
      where: {
        end_time: LessThan(currentDate), // Compare with current date and time
      },
      relations: ['room_detail'], // Ensure room_detail is loaded
    });

    if (roomsToUpdate.length > 0) {
      this.logger.log(
        `${roomsToUpdate.length} rooms found with expired end_time.`,
      );

      // Loop through the rooms and update their status
      for (const room of roomsToUpdate) {
        // Update the room status in the related room_detail
        room.room_detail.room_status = 'Available'; // Update the room status

        // Save the updated room_detail first
        await this.roomDetailRepository.save(room.room_detail);

        // After updating the room_detail, save the entire room entity (which contains the updated room_detail)
        await this.roomRepository.save(room);

        this.logger.log(`Room ${room.id} status updated to Available.`);
      }
    } else {
      this.logger.log('No rooms with expired end_time found.');
    }

    // Your batch logic here
  }
}
