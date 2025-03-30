import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateRoomDetailDto {
    @IsNotEmpty()
    room_number: string;
  
    @IsEnum(["Available", "Booked", "Maintenance"])
    room_status: string;
  }
  