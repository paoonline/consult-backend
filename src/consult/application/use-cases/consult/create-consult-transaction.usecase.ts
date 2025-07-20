import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { ConsultEntity } from 'src/consult/domain/entity/consult.entity';
import { ConsultRepository } from 'src/consult/infrastructure/consult.repository';
import { ApiService } from 'src/services/Api/api';
import { QueueJob } from 'src/services/Queue/queueJob';
import { createFactory } from 'src/utils/factory';
import { ConsultDto } from '../../dto/consult.dto';
import { CustomerDetail } from '@prisma/client';
import { IPaymentDto } from 'src/payment/application/dto/payment.dto';
import { NotificationDto } from 'src/notification/application/dto/notification.dto';
import { IBooking } from 'src/customer/application/dto/customer';
import { ConsultBuilder } from 'src/consult/application/builder/consult.builder';
import { BookingPayloadBuilder } from '../../builder/consult-booking-builder';

@Injectable()
export class CreateConsultTransactionUseCase {
  constructor(
    private readonly consultRepository: ConsultRepository,
    private readonly apiService: ApiService,
    private readonly queueJob: QueueJob,
  ) {}

  private extractFailedMessages(results: {
    bookingRes: PromiseSettledResult<any>;
    paymentRes: PromiseSettledResult<any>;
    notiRes: PromiseSettledResult<any>;
  }): string {
    const { bookingRes, paymentRes, notiRes } = results;
    return [
      bookingRes.status === 'rejected'
        ? `Booking failed: ${bookingRes.reason}`
        : null,
      paymentRes.status === 'rejected'
        ? `Payment failed: ${paymentRes.reason}`
        : null,
      notiRes.status === 'rejected'
        ? `Notification failed: ${notiRes.reason}`
        : null,
    ]
      .filter(Boolean)
      .join(', ');
  }

  async execute(data: ConsultDto, token: string) {
    const consultBuild = new ConsultBuilder().setFromCreate(data).build();
    const plainData = instanceToPlain(consultBuild);
    const snakeData = snakecaseKeys(plainData);

    const overlapping = await this.consultRepository.findFirst(data);
    if (overlapping) {
      throw new ConflictException('This time slot is already booked.');
    }
    const consultEntity = createFactory(snakeData, ConsultEntity);
    const [consult, customerConsultDetail] = await Promise.all([
      this.consultRepository.create(consultEntity),
      this.apiService.getFromApi<{ data: CustomerDetail }>(
        '/customer/detail/' + data.consultId,
        token,
      ),
    ]);

    if (!customerConsultDetail) {
      await this.consultRepository.delete(consult.id);
      throw new NotFoundException(
        `CustomerDetail not found for consultId: ${data.consultId}`,
      );
    }

    const bookingPayload = new BookingPayloadBuilder()
      .setCustomerDetailId(data.customerDetailId)
      .setConsultDetailId(data.consultDetailId)
      .setTime(data.startDate)
      .setConsultTransactionId(consult.id)
      .build();

    try {
      const [bookingRes, paymentRes, notiRes] = await Promise.allSettled([
        this.apiService.postApi<{ data: IBooking[] }, IBooking[]>(
          '/customer/booking',
          token,
          bookingPayload,
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
          },
        ),
      ]);

      if (
        bookingRes.status !== 'fulfilled' ||
        paymentRes.status !== 'fulfilled' ||
        notiRes.status !== 'fulfilled'
      ) {
        await this.consultRepository.delete(consult.id);
        const errorMessages = this.extractFailedMessages({
          bookingRes,
          paymentRes,
          notiRes,
        });
        throw new InternalServerErrorException(
          `Failed to complete consult: ${errorMessages}`,
        );
      }

      return consult;
    } catch (err: unknown) {
      const newErr = err as { code: string; message: string };

      // Prisma unique constraint on Booking will throw P2002
      if (
        newErr.code === 'P2002' ||
        (newErr.message && newErr.message.includes('Unique constraint'))
      ) {
        await this.consultRepository.delete(consult.id);
        throw new ConflictException(
          'Time slot is already booked. Please select another.',
        );
      }

      await this.consultRepository.delete(consult.id);
      throw new InternalServerErrorException(
        newErr?.message || 'An error occurred during consult creation.',
      );
    }
  }
}

// job noti
// await this.queueJob.addJob('NotificationQueue', 'sendNotification', {
//   id: consult.id,
//   description: 'test',
//   title: 'test',
//   device_token: '1',
// });
// headers: {
//   'x-delay-until': deliverAt.toString(),
// },
// x-delay-until
// await this.kafkaService.sendMessage('NotificationQueue', JSON.stringify({ id: consult.id, description: "test", title: "test", device_token: "1"}));
// return consult;
