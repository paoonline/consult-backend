import {
  Controller,
  Get,
  Res
} from '@nestjs/common';
import { Response } from 'express';

import { SkillService } from './application/skill.service';

@Controller('/skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService
  ) 
  {}

  @Get('/')
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
    } catch (error) {
      // Handle errors, for example, invalid credentials
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: '',
      });
    }
  }
  

}