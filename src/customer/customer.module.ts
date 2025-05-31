import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisModule } from 'src/services/Redis/redis.module';
import { SessionService } from 'src/services/Session/session.service';

import { SkillModule } from 'src/Skill/skill.module';
import { CustomerService } from './application/customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './infrastructure/customer.repository';
import { SkillService } from 'src/Skill/skill.service';
@Module({
  imports: [RedisModule, SkillModule],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, SessionService, CustomerRepository, SkillService],
  exports: [CustomerService]
})
export class CustomerModule {}