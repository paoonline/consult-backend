import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { BookingEntity } from '../domain/customer.booking.entity';
import { CustomerBookingRepository } from '../infrastructure/customer.booking.repository';
import { IBooking } from './dto/customer.dto';

@Injectable()
export class CustomerBookingService implements IRepository<IBooking, unknown, unknown, unknown, string> {
    constructor(
        private readonly customerBookingRepository: CustomerBookingRepository,

    ) { }
    async create(data: IBooking[], _?:string, tx?: Prisma.TransactionClient): Promise<string> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as BookingEntity[];
        const result = await this.customerBookingRepository.create(createFactory(snakeData, BookingEntity as keyof object, tx))
        return result
    }

    async findOne(id: string): Promise<IBooking | null> {
        const result = await this.customerBookingRepository.findOne(id)
        return camelcaseKeys(result as Booking ) as IBooking
    }

}

