import { UserPersistence } from './database/user.persistence';
import { UserModel } from './domain/user.model';

export class UserMapper {
  static toDomain(raw: UserPersistence): UserModel {
    const user = new UserModel({
      id: raw.id,
      email: raw.email,
      password: raw.password,
    });
    return user;
  }
}
