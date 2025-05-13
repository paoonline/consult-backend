import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { AuthService } from './login.service';
import { Login } from './login.entity';
import { UserModule } from 'src/user/user.module';
import { Users } from 'src/user/user.entity';
import { RedisModule } from 'src/services/Redis/redis.module';
@Module({
  imports: [TypeOrmModule.forFeature([Login, Users]), UserModule, RedisModule],
  controllers: [LoginController],
  providers: [AuthService],
  exports: [AuthService], // If you need to use LoginService in other modules
})
export class LoginModule {}