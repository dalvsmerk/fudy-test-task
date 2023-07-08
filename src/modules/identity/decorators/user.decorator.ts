import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserModel } from '../domain/user.model';

export const UserContext = createParamDecorator(
  (data: string, context: ExecutionContext): UserModel =>
    context.switchToHttp().getRequest().user,
);
