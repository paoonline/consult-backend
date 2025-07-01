import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';

import { SkillService } from './application/skill-map.service';

@Controller('/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get('/')
  @Header('Cache-Control', 'public, max-age=3600')
  //   @UseGuards(JwtAuthGuard)
  async create(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const skill = await this.skillService.findAll();
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'successful',
        data: skill,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({
        status: 400,
        message: errMsg,
        data: '',
      });
    }
  }
}
