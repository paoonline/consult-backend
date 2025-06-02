import { Note, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { ConsultNoteDto } from '../application/dto/consult.note.dto';
import { NoteRepository } from '../infrastructure/note.repository';
import { IRepository } from 'src/utils/respository';

@Injectable()
export class ConsultNoteService   implements
  IRepository<ConsultNoteDto, ConsultNoteDto, null ,null, ConsultNoteDto> {
  constructor(
    private readonly noteRepository: NoteRepository
  ) {}
  async create(data: ConsultNoteDto): Promise<ConsultNoteDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as Prisma.NoteCreateInput;
    const note = await this.noteRepository.create(snakeData)
    return camelcaseKeys(note)
  }

  async findAll(): Promise<ConsultNoteDto[]> {
    const note = await this.noteRepository.findAll()
    return note.map((item) => camelcaseKeys(item)) as ConsultNoteDto[];
  }
  
  async findOne(id: string):Promise<ConsultNoteDto> {
    const note = await this.noteRepository.findOne(id)
    return camelcaseKeys(note as Note) as ConsultNoteDto
  }
}
