import { CustomerType, Prisma } from '@prisma/client';

export interface IRepository<T, P, U = unknown, O = unknown, C = void, A = 0> {
  create?(props: P, other?: string, tx?: Prisma.TransactionClient): Promise<C>;
  findAll?(where?: CustomerType): Promise<T[]>;
  findUnique?(id: string): Promise<T | null>;
  findFirst?(id: string, tx?: Prisma.TransactionClient): Promise<T | null>;
  findOne?(id: string, other?: string): Promise<T | null>;
  findList?(list: string[]): Promise<T>;
  findMany?(param1?: string, param2?: string): Promise<T[]>;
  update?(id: string, data: U, other?: O): Promise<T | null>;
  updateMany?(): Promise<number>;
  delete?(id: string, secondId?: string): Promise<T>;
  logout?(key: string): Promise<void>;
  login?(email: string, password: string): Promise<string>;
  aggregate?(id: string, tx?: Prisma.TransactionClient): Promise<A>;
}
