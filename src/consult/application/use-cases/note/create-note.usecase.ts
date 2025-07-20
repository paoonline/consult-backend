// application/use-cases/note/create-note.usecase.ts
import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { Prisma } from '.prisma/client';
import { NoteRepository } from 'src/consult/infrastructure/note.repository';
import { createFactory } from 'src/utils/factory';
import { NoteEntity } from 'src/consult/domain/entity/note.entity';
import { ConsultNoteDto } from '../../dto/consult.note.dto';

@Injectable()
export class CreateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(data: ConsultNoteDto): Promise<ConsultNoteDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as Prisma.NoteCreateInput;
    const note = await this.noteRepository.create(
      createFactory(snakeData, NoteEntity),
    );
    return camelcaseKeys(note) as ConsultNoteDto;
  }
}
