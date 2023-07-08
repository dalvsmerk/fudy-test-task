import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserRepository } from '../database/user.repository';
import { AccessTokenPayload } from '../types';
import { UserMapper } from '../user.mapper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userRepo: UserRepository,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const { sub } = this.parseAuthorization(request);
    const userId = parseInt(sub, 10);
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    request['user'] = UserMapper.toDto(user);

    return true;
  }

  private parseAuthorization(request: Request): AccessTokenPayload {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException(
        'Failed to parse authorization header: empty header',
      );
    }

    const SEPARATOR = ' ';
    const [bearer, token = ''] = authorization.split(SEPARATOR);

    if (bearer !== 'Bearer' || token.length < 1) {
      throw new UnauthorizedException(
        'Failed to parse authorization header: invalid header',
      );
    }

    try {
      const payload = jwt.verify(
        token,
        this.config.get('jwtSecret'),
      ) as JwtPayload;

      return payload as AccessTokenPayload;
    } catch {
      throw new UnauthorizedException(
        'Failed to parse JWT token: invalid token',
      );
    }
  }
}
