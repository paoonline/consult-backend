import { Injectable } from '@nestjs/common';
import { CustomerType } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

  async createJwtToken(customer: {
    id: string;
    email: string;
    customer_type: CustomerType;
  }): Promise<string> {
    const payload: JwtPayload = {
      userId: customer.id,
      email: customer.email,
      customerType: customer.customer_type,
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }); // Token expires in 1 hour
  }
}
