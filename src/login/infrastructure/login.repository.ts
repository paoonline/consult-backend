import { login } from "@prisma/client";
import camelcaseKeys from "camelcase-keys";
import { PrismaService } from "prisma/prisma.service";
import { LoginEntity } from "../domain/login.entity";
import { Injectable } from "@nestjs/common";
import { SessionService } from "src/services/Session/session.service";
import { IRepository } from "src/utils/respository";
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
export class LoginRepository implements IRepository<login, LoginEntity> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService
  ) 
    {}

  async findAll(): Promise<login[]> {
    let result = await this.prisma.login.findMany();
    return camelcaseKeys(result) as unknown as login[];
  }

  async create(data: LoginEntity) {
    await this.prisma.login.create({
      data: { email_id: data.getEmail()},
    });
  }

  async findOne(id: string): Promise<login | null> {
    let result = await this.prisma.login.findFirst({ where: { id } });
    return camelcaseKeys(result as login) as unknown as login;
  }

  async logout(key: string): Promise<void> {
    this.sessionService.logout(key)
  }
}
