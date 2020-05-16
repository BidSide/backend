import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAttempt: any) {
    let userToAttempt;

    try {
      userToAttempt = await this.usersService.findOne(loginAttempt.email);
    } catch (e) {
      throw new ForbiddenException(e.message.message);
    }

    if (!userToAttempt) {
      throw new ForbiddenException('Wrong Email or Password');
    }

    return new Promise((resolve, reject) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) {
          reject('Wrong Email or Password');
          return;
        }

        if (isMatch && loginAttempt.password.toString()) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          reject('Wrong Email or Password');
        }
        return;
      });
    });
  }

  async refreshToken(req) {
    return this.createJwtPayload(req.user);
  }

  createJwtPayload(user) {
    const data: any = {
      sub: user.email,
      roles: user.roles,
    };
    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
    };
  }
}
