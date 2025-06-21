import { Injectable } from '@nestjs/common';
import { ConsultTransaction, CustomerDetail, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { ConsultEntity } from 'src/consult/domain/consult.entity';
import { ConsultRepository } from 'src/consult/infrastructure/consult.repository';
import { ApiService } from 'src/services/Api/api';
import { QueueJob } from 'src/services/Queue/queueJob';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { ConsultDto } from '../dto/consult.dto';
// import { IConsultMeeting } from 'src/consult/domain/consult.repository.interface';
// import { KafkaService } from 'src/services/Kafka/kafka.service';
import { IBooking } from 'src/customer/application/dto/customer.dto';
import { NotificationDto } from 'src/notification/application/dto/notification.dto';
import { IPaymentDto } from 'src/payment/application/dto/payment.dto';
@Injectable()
export class ConsultService
  implements
    IRepository<
      Partial<ConsultDto> | Partial<ConsultDto>[],
      ConsultDto,
      unknown,
      unknown,
      ConsultTransaction
    >
{
  constructor(
    private readonly queueJob: QueueJob,
    private readonly apiService: ApiService,
    private readonly consultRepository: ConsultRepository,
    // private readonly kafkaService: KafkaService,
  ) {}
  async create(data: ConsultDto, token: string): Promise<ConsultTransaction> {
    const newData = {
      ...data,
      customerDetailId: undefined,
      consultDetailId: undefined,
    };

    const plainData = instanceToPlain(newData);
    const snakeData = snakecaseKeys(
      plainData,
    ) as Prisma.ConsultTransactionCreateInput;

    const [consult, customerConsultDetail] = await Promise.all([
      this.consultRepository.create(createFactory(snakeData, ConsultEntity)),
      this.apiService.getFromApi<{ data: CustomerDetail }>(
        '/customer/detail/' + data.consultId,
        token,
      ),
    ]);

    if (!customerConsultDetail) {
      throw new Error(
        `CustomerDetail not found for consultId: ${data.consultId}`,
      );
    }

    const [bookingRes, paymentRes, notiRes] = await Promise.all([
      this.apiService.postApi<{ data: IBooking[] }, IBooking[]>(
        '/customer/booking',
        token,
        [
          {
            customerDetailId: data.customerDetailId,
            time: data.startDate,
          },
          {
            customerDetailId: data.consultDetailId,
            time: data.startDate,
          },
        ],
      ),
      this.apiService.postApi<{ data: IPaymentDto }, Partial<IPaymentDto>>(
        '/payment',
        token,
        {
          consultTransactionId: consult.id,
          customerId: consult.customer_id,
          consultId: consult.consult_id,
          price: customerConsultDetail.data.price,
        },
      ),
      this.apiService.postApi<{ data: NotificationDto }, NotificationDto>(
        '/notification',
        token,
        {
          consultTransactionId: consult.id,
          description: 'test',
          title: 'test',
          deviceToken: '1',
        },
      ),
    ]);

    if (!bookingRes || !paymentRes || !notiRes) {
      throw new Error(
        `Failed to create booking/payment/notification for consultId: ${data.consultId}`,
      );
    }
    return consult;
  }

  async findAll(customerId?: string): Promise<Partial<ConsultDto>[]> {
    const transactions = await this.consultRepository.findAll(customerId);
    return transactions.map((item) => camelcaseKeys(item, { deep: true }));
  }

  async findMany(customerId?: string): Promise<Partial<ConsultDto>[]> {
    const transactions = await this.consultRepository.findMany(customerId);
    return camelcaseKeys(transactions, { deep: true });
  }

  async update(id: string): Promise<Partial<ConsultDto>> {
    const result = await this.consultRepository.update(id);
    return camelcaseKeys(result);
  }

  // async meeting(
  //   customerId: string,
  //   consultId: string,
  //   token: string,
  // ): Promise<string> {
  //   await this.apiService.postApi<{ data: IPaymentDto }, IPaymentDto>(
  //     `/booking/${customerId}/${consultId}`,
  //     token,
  //   );

  //   return 'Success';
  // }
}
