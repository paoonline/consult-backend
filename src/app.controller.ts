import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/health')
export class HealthController {
  constructor() {}

  @Get('/')
  create(@Res() res: Response): Response<any, Record<string, any>> {
    try {
      // Send a successful response with the token
      return res.status(200).json({
        status: 200,
        message: 'Alive',
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
