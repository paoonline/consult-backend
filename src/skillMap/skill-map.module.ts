import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SkillRepository } from './infrastructure/skill.map.repository';
import { SkillService } from './application/skill-map.service';
import { SkillController } from './skill-map.controller';

@Global()
@Module({
  providers: [SkillRepository, SkillService, PrismaService],
  controllers: [SkillController],
  exports: [SkillRepository, SkillService],
})
export class SkillModule {}
