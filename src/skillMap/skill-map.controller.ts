import { BadRequestException, Controller, Get, Header } from '@nestjs/common';
import { SkillService } from './application/skill-map.service';
import { getErrorMessage } from 'src/utils/error';

@Controller('/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get('/')
  @Header('Cache-Control', 'public, max-age=3600')
  async findAll() {
    try {
      const skill = await this.skillService.findAll();
      return {
        status: 200,
        message: 'successful',
        data: skill,
      };
    } catch (error: unknown) {
      throw new BadRequestException(getErrorMessage(error));
    }
  }
}
