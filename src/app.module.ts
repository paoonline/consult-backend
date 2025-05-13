import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch/batch.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoginModule } from './login/login.module';

require('dotenv').config();
@Module({
  imports: 
  [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LoginModule
    // TypeOrmModule.forFeature([Room, RoomDetail]),
    // LoginModule,
  ],
  providers: [BatchService],
})
export class AppModule {}
