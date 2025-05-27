import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './application/customer.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';
import { CustomerRepository } from './infrastructure/customer.repository';
@Module({
  imports: [RedisModule],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, SessionService, CustomerRepository],
  exports: [CustomerService]
})
export class CustomerModule {}