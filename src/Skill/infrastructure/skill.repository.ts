import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { IRepository } from "src/utils/respository";

@Injectable()
export class SkillRepository implements Pick<IRepository<{id: string}[], unknown>, 'findList'> {
  constructor(
    private readonly prisma: PrismaService,
  ) 
    {}

  async findList(skillsList: string[]): Promise<{id: string}[]> {
    const skills = await this.prisma.skill.findMany({
        where: {
          name: {
            in: skillsList,
          },
        },
        select: {
          id: true,
        },
      });
      const skillIds = skills.map((skill) => skill.id);
      return skillIds.map((id) => ({id}));
  }

  async findAll(): Promise<string[]> {
    let skills = await this.prisma.skill.findMany()
    return skills.map((r) => r.name)
  }
}
