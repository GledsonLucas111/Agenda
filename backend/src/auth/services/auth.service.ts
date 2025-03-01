import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserPayload } from '../model/UserPayload';
import { UserToken } from '../model/UserToken';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<UserToken> {
    try {
      const user = await this.validateUser(email, password);

      const payload: UserPayload = {
        username: user.email,
        sub: user.id,
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
        return {
          ...user,
        };
      }
    } else {
      throw new UnauthorizedException(
        'Email address or password provided is incorrect.',
      );
    }
    throw new Error('Email address or password provided is incorrect.');
  }
}
