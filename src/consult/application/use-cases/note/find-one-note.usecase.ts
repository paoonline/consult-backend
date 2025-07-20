// application/use-cases/note/find-one-note.usecase.ts
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { NoteRepository } from 'src/consult/infrastructure/note.repository';
import { ConsultNoteDto } from '../../dto/consult.note.dto';
import { Note } from '.prisma/client';

@Injectable()
export class FindOneNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(id: string): Promise<ConsultNoteDto> {
    const note = await this.noteRepository.findOne(id);
    return camelcaseKeys(note as Note) as ConsultNoteDto;
  }
}
