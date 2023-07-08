import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import configurationSchema from './config/config.schema';
import { DatabasePool } from './lib/database/database-pool';
import { IdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: configurationSchema(),
    }),
    IdentityModule,
  ],
  controllers: [],
  providers: [DatabasePool],
})
export class AppModule {}
