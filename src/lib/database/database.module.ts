import { Global, Module } from '@nestjs/common';
import { DatabasePool } from './database-pool';

@Global()
@Module({
  providers: [DatabasePool],
  exports: [DatabasePool],
})
export class DatabaseModule {}
