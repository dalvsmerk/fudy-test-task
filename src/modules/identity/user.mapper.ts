import { UserPersistence } from './database/user.persistence';
import { UserModel } from './domain/user.model';
import { UserDto } from './dtos/user.dto';

export class UserMapper {
  static toDomain(raw: UserPersistence): UserModel {
    const user = UserModel.of({
      id: raw.id,
      email: raw.email,
      password: raw.password,
    });
    return user;
  }

  static toDto(user: UserModel): UserDto {
    const raw = {
      id: user.id,
      email: user.email,
    };
    return raw;
  }
}
