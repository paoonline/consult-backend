// application/use-cases/note/find-all-notes.usecase.ts
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { NoteRepository } from 'src/consult/infrastructure/note.repository';
import { ConsultNoteDto } from '../../dto/consult.note.dto';

@Injectable()
export class FindAllNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(): Promise<ConsultNoteDto[]> {
    const notes = await this.noteRepository.findAll();
    return notes.map((n) => camelcaseKeys(n)) as ConsultNoteDto[];
  }
}
