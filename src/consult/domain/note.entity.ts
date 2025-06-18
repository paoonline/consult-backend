import { Note } from '@prisma/client';

export class NoteEntity {
  constructor(private readonly data: Note) {}

  getData(): Note {
    return this.data;
  }
}
