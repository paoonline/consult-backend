import { Injectable } from "@nestjs/common";
import { login } from "@prisma/client";
import camelcaseKeys from "camelcase-keys";
import { PrismaService } from "prisma/prisma.service";
import { IRepository } from "src/utils/respository";
import { loginLogDto } from "../application/login.dto";
import { LoginEntity } from "../domain/login.entity";
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
export class LoginRepository implements Omit<IRepository<loginLogDto, LoginEntity>, 'delete'> {
  constructor(
    private readonly prisma: PrismaService,
  ) 
    {}

  async findAll(): Promise<loginLogDto[]> {
    let result = await this.prisma.login.findMany();
    return camelcaseKeys(result) as loginLogDto[];
  }

  async create(data: LoginEntity) {
    await this.prisma.login.create({
      data: { email_id: data.getEmail()},
    });
  }

  async findOne(id: string): Promise<loginLogDto | null> {
    let result = await this.prisma.login.findFirst({ where: { id } });
    return camelcaseKeys(result as login) as loginLogDto;
  }
}
