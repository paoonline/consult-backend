import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../infrastructure/skill.map.repository';
import { IRepository } from 'src/utils/respository';
import { SkillEntity } from '../domain/skill.entity';

@Injectable()
export class SkillService implements IRepository<string, any> {
  constructor(private readonly skillRepository: SkillRepository) {}

  async skillMap(skillsList: string[]): Promise<{ id: string }[]> {
    return this.skillRepository.findList(skillsList);
  }

  async findAll(): Promise<string[]> {
    const rawSkills = await this.skillRepository.findAll();
    return rawSkills.map((rawName) => new SkillEntity(rawName).getData().name);
  }
}
