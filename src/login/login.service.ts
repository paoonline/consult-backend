import { Injectable } from '@nestjs/common';
import { login } from '@prisma/client';
import bcrypt from 'bcryptjs';
import camelcaseKeys from 'camelcase-keys';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/services/Redis/redis.service';
@Injectable()
export class LoginService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

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
    // find user online
    // user can online with 1 session
    const online = await this.redisService.getValue(`online:${email}`)

    if(online) {
      throw new Error('Session was duplicated')
    }

    // Find the user by email
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    this.createLog(customer.id);
    this.redisService.setValueString(`online:${email}`, 'true', 'EX', 7200)

    return this.createJwtToken(customer);
  }

  async createJwtToken(customer: {
    id: string;
    email: string;
  }): Promise<string> {
    const payload: JwtPayload = {
      userId: customer.id,
      email: customer.email,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }); // Token expires in 1 hour
  }

  async findAll(): Promise<login[]> {
    let result = await this.prisma.login.findMany();
    return camelcaseKeys(result) as unknown as login[];
  }

  async findByLogin(id: string): Promise<login | null> {
    let result = await this.prisma.login.findFirst({ where: { id } });

    return camelcaseKeys(result as login) as unknown as login;
  }
}
