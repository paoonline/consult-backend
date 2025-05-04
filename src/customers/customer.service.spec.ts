import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { S3Service } from 'src/services/s3.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: jest.Mocked<Repository<Customer>>;

  const mockCustomer: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      description: '',
      phone_number: '',
      image_path: '',
      rooms: []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        S3Service,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repo = module.get(getRepositoryToken(Customer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    repo.create.mockReturnValue(mockCustomer);
    repo.save.mockResolvedValue(mockCustomer);

    const result = await service.create(mockCustomer,);
    expect(repo.create).toHaveBeenCalledWith(mockCustomer);
    expect(repo.save).toHaveBeenCalledWith(mockCustomer);
    expect(result).toEqual(mockCustomer);
  });

  it('should return all customers', async () => {
    repo.find.mockResolvedValue([mockCustomer]);

    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockCustomer]);
  });

  it('should return a customer by ID', async () => {
    repo.findOne.mockResolvedValue(mockCustomer);

    const result = await service.findOne('1');
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const updated = { name: 'Updated Name' };

    repo.findOne.mockResolvedValueOnce(mockCustomer); // first for findOne(id)
    repo.save.mockResolvedValue({ ...mockCustomer, ...updated });
    repo.findOne.mockResolvedValueOnce({ ...mockCustomer, ...updated }); // after save

    const result = await service.update('1', updated);
    expect(repo.save).toHaveBeenCalledWith(updated);
    expect(result).toEqual({ ...mockCustomer, ...updated });
  });

  it('should return null if update target not found', async () => {
    repo.findOne.mockResolvedValue(null);

    const result = await service.update('999', { name: 'Ghost' });
    expect(result).toBeNull();
  });

  it('should delete a customer by ID', async () => {
    const mockDeleteResult: DeleteResult = { affected: 1, raw: '' };
    repo.delete.mockResolvedValue(mockDeleteResult);

    const result = await service.delete('1');
    expect(repo.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockDeleteResult);
  });
});
