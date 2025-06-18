import { Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { NoteEntity } from '../domain/note.entity';

@Injectable()
export class NoteRepository
  implements IRepository<Note, NoteEntity, null, null, Note>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(data: NoteEntity): Promise<Note> {
    return this.prisma.note.create({
      data: data.getData(),
    });
  }

  async findOne(id: string): Promise<Note | null> {
    return this.prisma.note.findFirst({
      where: { id },
    });
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }
}
