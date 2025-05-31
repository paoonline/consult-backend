import { Injectable } from '@nestjs/common';
import { SkillRepository } from './skill.repository';


@Injectable()
export class SkillService {
  constructor(
    private readonly skillRepository: SkillRepository
  ) {}

  async skillMap(skillsList: string[]):Promise<{id: string}[]> {
    return this.skillRepository.findList(skillsList)
  }

}
