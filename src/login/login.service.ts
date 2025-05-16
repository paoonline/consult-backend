import { Injectable } from '@nestjs/common';
import { login } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class LoginService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  constructor(private readonly prisma: PrismaService) {}

  async createLog(emailId: string) {
    try {
      const result = await this.prisma.login.create({
        data: {
          email_id: emailId,
        },
      });
      console.log('Saved login:', result);
    } catch (error) {
      console.error('Error saving login:', error);
    }
  }

  async login(email: string, password: string): Promise<string> {

    // Find the user by email
    const customer = await this.prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    this.createLog(customer.id)

    return this.createJwtToken(customer);
  }

  async createJwtToken(customer: { id: string; email: string }): Promise<string> {
    const payload: JwtPayload = {
      userId: customer.id,
      email: customer.email,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '3h' }); // Token expires in 1 hour
  }

  findAll(): Promise<login[]> {
    return this.prisma.login.findMany();
  }

  findByLogin(id: string): Promise<login | null> {
    return this.prisma.login.findFirst({ where: { id } });
  }
}
