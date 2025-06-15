import { Injectable } from '@nestjs/common';
import { ConsultTransaction, CustomerDetail, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ApiService } from 'src/services/Api/api';
import { QueueJob } from 'src/services/Queue/queueJob';
import { ConsultDto } from '../dto/consult.dto';
import { ConsultRepository } from 'src/consult/infrastructure/consult.repository';
import { createFactory } from 'src/utils/factory';
import { ConsultEntity } from 'src/consult/domain/consult.entity';
import { IRepository } from 'src/utils/respository';
import { IConsultMeeting } from 'src/consult/domain/consult.repository.interface';
import { KafkaService } from 'src/services/Kafka/kafka.service';
import { NotificationDto } from 'src/notification/application/dto/notification.dto';
import { IBooking } from 'src/customer/application/dto/customer.dto';
import { IPaymentDto } from 'src/payment/application/dto/payment.dto';
@Injectable()
export class ConsultService
  implements
    IRepository<
      ConsultDto | ConsultDto[],
      ConsultDto,
      unknown,
      unknown,
      ConsultTransaction
    >,
    IConsultMeeting
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueJob: QueueJob,
    private readonly apiService: ApiService,
    private readonly consultRepository: ConsultRepository,
    private readonly kafkaService: KafkaService,
  ) {}
  async create(data: ConsultDto, token: string): Promise<ConsultTransaction> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(
      plainData,
    ) as Prisma.ConsultTransactionCreateInput;

    const consult = await this.consultRepository.create(
      createFactory(snakeData, ConsultEntity),
    );
    const customerDetail = await this.apiService.getFromApi<{
      data: CustomerDetail;
    }>('/customer/detail/' + data.customerId, token);
    const customerConsultDetail = await this.apiService.getFromApi<{
      data: CustomerDetail;
    }>('/customer/detail/' + data.consultId, token);

    if (!customerDetail) {
      throw new Error(
        `CustomerDetail not found for customerId: ${data.customerId}`,
      );
    }

    if (!customerConsultDetail) {
      throw new Error(
        `CustomerDetail not found for consultId: ${data.consultId}`,
      );
    }

    // transactional
    const booking = this.apiService.postApi<{ data: IBooking[] }, IBooking[]>(
      '/customer/booking',
      token,
      [
        {
          customerDetailId: customerDetail.data.id,
          time: data.startDate,
        },
        {
          customerDetailId: customerConsultDetail.data.id,
          time: data.startDate,
        },
      ],
    );

    const payment = this.apiService.postApi<{ data: IPaymentDto }, IPaymentDto>(
      '/payment',
      token,
      {
        consultTransactionId: consult.id,
        price: customerConsultDetail.data.price,
      },
    );

    // noti
    const notification = this.apiService.postApi<
      { data: NotificationDto },
      NotificationDto
    >('/notification', token, {
      consultTransactionId: consult.id,
      description: 'test',
      title: 'test',
      deviceToken: '1',
    });

    const [bookingRes, paymentRes, notiRes] = await Promise.all([booking, payment, notification]);

    if (!bookingRes || !paymentRes || !notiRes) {
      throw new Error(
        `Failed to create booking/payment/notification for consultId: ${data.consultId}`,
      );
    }

    // job noti
    // await this.queueJob.addJob('NotificationQueue', 'sendNotification', { id: consult.id, description: "test", title: "test", device_token: "1" })
    // await this.kafkaService.sendMessage('NotificationQueue', JSON.stringify({ id: consult.id, description: "test", title: "test", device_token: "1"}));

    return consult;
  }

  async findAll(): Promise<ConsultDto[]> {
    const transactions = await this.consultRepository.findAll();
    return transactions.map((item) => camelcaseKeys(item));
  }

  async findMany(customerId: string, consultId: string): Promise<ConsultDto[]> {
    const transactions = await this.consultRepository.findMany(
      customerId,
      consultId,
    );
    return camelcaseKeys(transactions);
  }

  async meeting(customerId: string, consultId: string): Promise<string> {
    await this.prisma.booking.deleteMany({
      where: {
        id: { in: [customerId, consultId] },
      },
    });

    return 'Success';
  }
}
