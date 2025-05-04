import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { S3Service } from 'src/services/s3.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    dto: CreateCustomerDto,
    file?: Express.Multer.File,
  ): Promise<Customer | string> {
    let imagePath = '';

    let customersDuplicate = await this.customerRepository.findOne({
      where: { name: dto.name },
    });
    if (customersDuplicate) {
      throw new Error('Account duplicate');
    }

    if (file) {
      imagePath = await this.s3Service.uploadFile(file);
    }

    const customer = this.customerRepository.create({
      ...dto,
      image_path: imagePath ?? undefined,
    });
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
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
    const findCustomer = this.findOne(id);
    if (!findCustomer) {
      return null; // Return null if the room isn't found
    }

    await this.customerRepository.save(updateCustomerDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.customerRepository.delete(id);
  }
}
