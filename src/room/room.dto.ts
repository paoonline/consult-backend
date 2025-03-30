import { IsDate, IsNotEmpty, ValidateNested, } from "class-validator";
import { CreateRoomDetailDto } from "./roomDetail.dto";

export class CreateRoomDto {
  @ValidateNested()
  room_detail: CreateRoomDetailDto;

  @IsDate()
  @IsNotEmpty()
  book_time: Date;

  @IsDate()
  @IsNotEmpty()
  end_time: Date;
}