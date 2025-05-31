import { Note, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';

import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultNoteDto } from '../dto/consult.note.dto';

@Injectable()
export class ConsultNoteService {
  constructor(private readonly prisma: PrismaService) {}
  createNote(data: ConsultNoteDto): Promise<Note | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as Prisma.NoteCreateInput;

    return this.prisma.note.create({
      data: snakeData,
    });
  }

  async findAll(): Promise<Note[]> {
    const note = await this.prisma.note.findMany()
    return note.map((item) => camelcaseKeys(item)) as unknown as Note[];
  }

  async findByNoteId(id: string):Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    })
    return camelcaseKeys(note as Note) as unknown as Note
  }
}
