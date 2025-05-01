import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find()
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customerRepository.findOne({
        where: { id },
      });
  }

  async update(
    id: string,
    updateCustomerDto: Partial<CreateCustomerDto>,
  ): Promise<Customer | null> {
    const findCustomer = this.findOne(id)
    if (!findCustomer) {
        return null; // Return null if the room isn't found
    }

    await this.customerRepository.save(updateCustomerDto);
    return this.findOne(id)
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.customerRepository.delete(id);
  }
}
