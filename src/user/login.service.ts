
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: { email_id: string }) {
    return this.prisma.login.create({ data });
  }

//   async findAll() {
//     return this.prisma.user.findMany();
//   }

//   async findByEmail(email: string) {
//     return this.prisma.user.findUnique({ where: { email } });
//   }
}
