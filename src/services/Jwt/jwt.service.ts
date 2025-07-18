import { Injectable } from '@nestjs/common';
import { CustomerType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { ICustomerDetail } from 'src/customer/application/dto/customer.dto';

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET ?? '';

  createJwtToken(customer: {
    id: string;
    email: string;
    customerType: CustomerType;
    customerDetail?: Partial<ICustomerDetail>;
  }): string {
    const payload: JwtPayload = {
      userId: customer.id,
      email: customer.email,
      customerType: customer.customerType,
      customerDetailId: customer?.customerDetail?.id,
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }); // Token expires in 1 hour
  }
}
