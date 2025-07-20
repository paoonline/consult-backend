import { Note } from '@prisma/client';

export class NoteEntity {
  constructor(private readonly data: Note) {
    this.validateDescription(data.description);
  }

  validateDescription(input: string): void {
    const tagPattern = /<[^>]*>/g;
    if (tagPattern.test(input)) {
      throw new Error('HTML tags are not allowed.');
    }
  }

  getData(): Note {
    return this.data;
  }
}
