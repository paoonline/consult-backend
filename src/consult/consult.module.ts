import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConsultController } from './consult.controller';
import { ConsultService } from './consult.service';
@Module({
  controllers: [ConsultController],
  providers: [ConsultService, PrismaService],
})
export class ConsultModule {}