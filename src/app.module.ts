import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roomModule } from './room/room.module';
import { BatchService } from './batch/batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RoomDetail } from './room/room-detail.entity';
import { Room } from './room/room.entity';
import { CustomerModule } from './customers/customer.module';
require('dotenv').config();
@Module({
  imports: 
  [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '123456',
      database: process.env.DB_NAME || 'hotel_management',
      autoLoadEntities: true,
      synchronize: true,  // Use only in development
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl: {
          rejectUnauthorized: false, // allow self-signed cert (dev)
        },
      }
    }),
    TypeOrmModule.forFeature([Room, RoomDetail]),
    roomModule,
    LoginModule, 
    CustomerModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService, BatchService],
})
export class AppModule {}
