import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { JwtStrategy } from 'src/validate/jwt.strategy';
import { RoomDetail } from './roomDetail.entity';
import { UserModule } from 'src/user/user.module';
import { RoomDetailService } from './roomDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomDetail]), UserModule],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy, RoomDetailService],
  exports: [RoomService, RoomDetailService],
})
export class roomModule {}
