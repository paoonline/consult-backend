import { Repository } from "typeorm";
import { RoomDetail } from "./roomDetail.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateRoomDetailDto } from "./roomDetail.dto";

@Injectable()
export class RoomDetailService {
  constructor(
    @InjectRepository(RoomDetail)
    private readonly roomDetailRepository: Repository<RoomDetail>,
  ) {}

  async create(createRoomDetailDto: CreateRoomDetailDto): Promise<RoomDetail> {
    const roomDetail = this.roomDetailRepository.create(createRoomDetailDto);
    return this.roomDetailRepository.save(roomDetail);
  }

  async findAll(): Promise<RoomDetail[]> {
    return this.roomDetailRepository.find();
  }

  async findOne(id: string): Promise<RoomDetail | null> {
    return this.roomDetailRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoomDetailDto: Partial<CreateRoomDetailDto>): Promise<RoomDetail | null> {
    await this.roomDetailRepository.update(id, updateRoomDetailDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.roomDetailRepository.delete(id);
  }
}