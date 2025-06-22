import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/health')
  async checkHealth(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return res.status(200).json({
        status: 'ok',
        db: true,
        timestamp: new Date().toISOString(),
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return res.status(503).json({
        status: 'error',
        db: false,
        message: errMsg,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
