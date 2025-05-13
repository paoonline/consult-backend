import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';

import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: any) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    // const user = await this.usersService.findOne(payload.userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // return user; // Attach the user to the request
  }
}
