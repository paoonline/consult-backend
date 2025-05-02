// customer.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
// import { JwtAuthGuard } from 'src/validate/jwt-auth.guard';
import { Response } from 'express';
import { CreateCustomerDto } from './customer.dto';

import { JwtAuthGuard } from '../../src/validate/jwt-auth.guard';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomerService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockRes = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res as unknown as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useValue: mockCustomerService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // bypass auth
      .compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    const dto = { name: 'John', email: 'john@example.com' };
    const result = { id: '1', ...dto };

    mockCustomerService.create.mockResolvedValue(result);

    const res = mockRes();
    await controller.createCustomer(res, dto as CreateCustomerDto);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'successful',
      data: result,
    });
  });

  it('should return all customers', async () => {
    const result = [{ id: '1', name: 'John' }];
    mockCustomerService.findAll.mockResolvedValue(result);

    const res = mockRes();
    await controller.getAllCustomers(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'successful',
      data: result,
    });
  });

  it('should return one customer by ID', async () => {
    const result = { id: '1', name: 'John' };
    mockCustomerService.findOne.mockResolvedValue(result);

    const res = mockRes();
    await controller.getCustomerById(res, '1');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'successful',
      data: result,
    });
  });

  it('should delete a customer by ID', async () => {
    const result = { id: '1', name: 'John' };
    mockCustomerService.delete.mockResolvedValue(result);

    const res = mockRes();
    await controller.deleteCustomerById(res, '1');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'successful',
      data: result,
    });
  });
});
