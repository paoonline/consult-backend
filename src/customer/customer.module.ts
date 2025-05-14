import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtStrategy } from 'src/validate/jwt.strategy';
@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, JwtStrategy],
})
export class CustomerModule {}