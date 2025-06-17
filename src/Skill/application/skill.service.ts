import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../infrastructure/skill.repository';
import { IRepository } from 'src/utils/respository';


@Injectable()
export class SkillService implements IRepository<string, any> {
  constructor(
    private readonly skillRepository: SkillRepository
  ) {}

  async skillMap(skillsList: string[]):Promise<{id: string}[]> {
    return this.skillRepository.findList(skillsList)
  }

  async findAll():Promise<string[]> {
    return this.skillRepository.findAll()
  }

}
