import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { Login } from './login.entity';
import { Users } from 'src/user/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createJwtToken(user: Users): Promise<string> {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
  }

  async login(email: string, password: string): Promise<string> {
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    const loginEntry = this.loginRepository.create({ user });
    this.loginRepository.save(loginEntry);

    return this.createJwtToken(user); 
  }

}