/* eslint-disable @typescript-eslint/unbound-method */
import { PaymentTransaction } from '@prisma/client';
import { PaymentRepository } from 'src/payment/infrastructure/payment.repository';
import { IPaymentDto } from '../dto/payment.dto';
import { CreatePaymentUseCase } from '../use-cases/create-payment.use-case';

jest.mock('src/payment/infrastructure/payment.repository');

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;
  let paymentRepository: jest.Mocked<PaymentRepository>;

  beforeEach(() => {
    paymentRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<PaymentRepository>;
    useCase = new CreatePaymentUseCase(paymentRepository);
  });

  it('should create payment and return camelCase result', async () => {
    // Arrange
    const input: IPaymentDto = {
      paymentDate: new Date(),
      price: 1000,
      consultId: 'consult-123',
      consultTransactionId: 'txn-456',
      customerId: 'customer-789',
    };

    const mockedDbResult: PaymentTransaction = {
      payment_date: input.paymentDate ?? new Date(),
      price: input.price,
      consult_id: input.consultId,
      consult_transaction_id: input.consultTransactionId,
      customer_id: input.customerId,
      id: '',
    };

    paymentRepository.create.mockResolvedValue(mockedDbResult);

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(paymentRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        payment_date: input.paymentDate,
        price: input.price,
        consult_id: input.consultId,
        consult_transaction_id: input.consultTransactionId,
        customer_id: input.customerId,
      }),
    );

    expect(result).toMatchObject({
      paymentDate: input.paymentDate,
      price: input.price,
      consultId: input.consultId,
      consultTransactionId: input.consultTransactionId,
      customerId: input.customerId,
    });
  });
});
