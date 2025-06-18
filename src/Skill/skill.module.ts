import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SkillRepository } from './infrastructure/skill.repository';
import { SkillService } from './application/skill.service';
import { SkillController } from './skill.controller';

@Module({
  providers: [SkillRepository, SkillService, PrismaService],
  controllers: [SkillController],
  exports: [SkillRepository, SkillService],
})
export class SkillModule {}
