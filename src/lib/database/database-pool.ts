import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabasePool {
  constructor(configService: ConfigService) {
    this.pool = new Pool({
      user: configService.get('database.user'),
      host: configService.get('database.host'),
      database: configService.get('database.database'),
      password: configService.get('database.password'),
      port: configService.get('database.port'),
      max: configService.get('database.pool.max'),
      connectionTimeoutMillis: 5000,
    });
  }

  private readonly pool: Pool;

  async query(text: string, params: any[]) {
    return this.pool.query(text, params);
  }
}
