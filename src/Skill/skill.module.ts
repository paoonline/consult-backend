import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { SkillRepository } from "./infrastructure/skill.repository";
import { SkillService } from "./application/skill.service";

@Module({
    providers: [SkillRepository, SkillService, PrismaService],
    exports: [SkillRepository, SkillService]
})
export class SkillModule {}