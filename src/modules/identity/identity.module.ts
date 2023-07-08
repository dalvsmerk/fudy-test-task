import { Module } from '@nestjs/common';
import { DatabasePool } from 'lib/database/database-pool';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './database/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, DatabasePool],
  exports: [],
})
export class IdentityModule {}
