import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'lib/database/database.module';
import configuration from './config/config';
import configurationSchema from './config/config.schema';
import { IdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: configurationSchema(),
    }),
    DatabaseModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
