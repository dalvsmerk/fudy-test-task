import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { verifyPassword } from 'lib/tools/passwords';
import { UserRepository } from '../database/user.repository';
import { JwtTokenDto } from '../dtos/jwt-token.dto';
import { PasswordsDontMatchError } from '../errors/passwords-dont-match.error';
import { UserNotFoundError } from '../errors/user-not-found.error';

type AccessTokenPayload = {
  sub: string;
  iss: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async authenticate(email: string, password: string): Promise<JwtTokenDto> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordsMatch = await verifyPassword(password, user.password);

    if (!passwordsMatch) {
      throw new PasswordsDontMatchError();
    }

    const payload: AccessTokenPayload = {
      sub: user.id.toString(),
      iss: 'https://fudy.ee',
    };
    const accessToken = jwt.sign(payload, this.config.get('jwtSecret'));

    return { accessToken };
  }
}
