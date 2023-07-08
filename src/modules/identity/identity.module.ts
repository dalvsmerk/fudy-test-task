import { Module } from '@nestjs/common';
import { DatabasePool } from 'lib/database/database-pool';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './database/user.repository';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserRepository, DatabasePool, AuthService],
  exports: [],
})
export class IdentityModule {}
