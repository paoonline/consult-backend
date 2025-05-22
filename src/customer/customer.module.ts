import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { RedisModule } from 'src/services/Redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}