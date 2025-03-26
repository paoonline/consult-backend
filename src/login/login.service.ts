import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { Login } from './login.entity';
import { Users } from 'src/user/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}


  async loginValidate(email: string, password: string): Promise<Login | null> {
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user)
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
    return this.loginRepository.save(loginEntry);
  }

}