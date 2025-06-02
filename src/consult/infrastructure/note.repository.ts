import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';

@Injectable()
export class NoteRepository
  implements
  IRepository<
    Note,
    Prisma.NoteCreateInput,
    null,
    null,
    Note
  > {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({
        data
      });
  }

  async findOne(id: string):Promise<Note | null>  {
    return this.prisma.note.findFirst({
        where: { id },
    })
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany()
  }

}
