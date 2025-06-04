import { Injectable } from '@nestjs/common';
import { ConsultTransaction, CustomerDetail, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ApiService } from 'src/services/Api/api';
import { QueueJob } from 'src/services/Queue/queueJob';
import { ConsultDto } from '../dto/consult.dto';


@Injectable()
export class ConsultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueJob: QueueJob,
    private readonly apiService: ApiService
  ) { }
  // refactor
  async createConsult(data: ConsultDto, token: string): Promise<ConsultTransaction | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(
      plainData,
    ) as Prisma.ConsultTransactionCreateInput;

    const consult = await this.prisma.consultTransaction.create({
      data: snakeData,
    });

    const customerDetail = await this.apiService.getFromApi<{ data: CustomerDetail }>('/customer/detail/' + data.customerId, token)
    const customerConsultDetail = await this.apiService.getFromApi<{ data: CustomerDetail }>('/customer/detail/' + data.consultId, token)

    if (!customerDetail) {
      throw new Error(`CustomerDetail not found for customerId: ${data.customerId}`);
    }

    if (!customerConsultDetail) {
      throw new Error(`CustomerDetail not found for consultId: ${data.consultId}`);
    }

    await this.prisma.booking.createMany({
      data: [
        {
          customer_detail_id: customerDetail.data.id,
          time: data.startDate,
        },
        {
          customer_detail_id: customerConsultDetail.data.id,
          time: data.startDate,
        },
      ],
    });

    await this.prisma.paymentTransaction.create({
      data: {
        price: customerConsultDetail.data.price,
        consult_transaction_id: consult.id
      }
    })

    // job noti
    await this.queueJob.addJob('NotificationQueue', 'sendNotification', { id: consult.id, description: "test", title: "test", device_token: "1" })
    return consult;
  }

  async findAll(): Promise<ConsultDto[]> {
    const transactions = await this.prisma.consultTransaction.findMany()
    return transactions.map((item) => camelcaseKeys(item));
  }

  async findByConsultTransaction(
    customerId: string,
    consultId: string,
  ): Promise<ConsultDto[] | null> {
    const transactions = await this.prisma.consultTransaction.findMany({
      where: {
        customer_id: customerId,
        consult_id: consultId,
      },
    });
    return camelcaseKeys(transactions)
  }

  async meeting(customerId: string, consultId: string): Promise<string> {
    await this.prisma.booking.deleteMany({
      where: {
        id: { in: [customerId, consultId] },
      },
    });

    return 'Success'
  }
}
