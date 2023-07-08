import { UserPersistence } from './database/user.persistence';
import { UserModel } from './domain/user.model';
import { UserDto } from './dtos/user.dto';

export class UserMapper {
  static toDomain(raw: UserPersistence): UserModel {
    return UserModel.of({
      id: raw.id,
      email: raw.email,
      password: raw.password,
    });
  }

  static toDto(user: UserModel): UserDto {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
