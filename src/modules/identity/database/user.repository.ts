import { Injectable } from '@nestjs/common';
import { DatabasePool } from 'lib/database/database-pool';
import { Nullable } from 'lib/types';
import { UserModel } from '../domain/user.model';
import { UserMapper } from '../user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly pool: DatabasePool) {}

  async create(user: UserModel): Promise<UserModel> {
    await user.validate();

    const result = await this.pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [user.email, user.password],
    );

    return UserMapper.toDomain(result.rows[0]);
  }

  async findByEmail(email: string): Promise<Nullable<UserModel>> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (!result.rows[0]) {
      return null;
    }

    return UserMapper.toDomain(result.rows[0]);
  }

  async findById(id: number): Promise<Nullable<UserModel>> {
    const result = await this.pool.query(
      'SELECT id, email, password FROM users WHERE id = $1',
      [id],
    );

    if (!result.rows[0]) {
      return null;
    }

    return UserMapper.toDomain(result.rows[0]);
  }
}
