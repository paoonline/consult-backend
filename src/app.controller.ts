import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/')
  async create(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      // Send a successful response with the token
      await this.prisma.$queryRaw`SELECT 1`;
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
