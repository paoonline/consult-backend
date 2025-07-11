import { Injectable } from '@nestjs/common';
import { login } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { LoginInput } from '../domain/login.entity';
// src/
//   └── user/
//       ├── domain/
//       │   ├── user.entity.ts
//       │   ├── email.vo.ts
//       │   └── password.vo.ts
//       ├── application/
//       │   └── user.service.ts  <-- use cases
//       ├── infrastructure/
//       │   └── user.repository.ts
//       └── user.controller.ts

// repository interface
// export interface ILoginRepository<T, P> {
//     create(props: P): Promise<void>;
//     findAll(): Promise<T[]>;
//     findOne(id: string): Promise<T | null>,
//     logout(key: string): Promise<void>
// }

@Injectable()
export class LoginRepository
  implements Omit<IRepository<login, LoginInput>, 'delete'>
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<login[]> {
    return await this.prisma.login.findMany();
  }

  async create(data: LoginInput) {
    await this.prisma.login.create({
      data: { email_id: data.email_id },
    });
  }

  async findOne(id: string): Promise<login | null> {
    return await this.prisma.login.findFirst({ where: { id } });
  }
}
