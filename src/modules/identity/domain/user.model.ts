import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseModel } from 'lib/domain/base.model';

export class UserModel extends BaseModel {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(320)
  readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  readonly password: string;

  private constructor(props: Partial<UserModel>) {
    super();

    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
  }

  static of(props: Partial<UserModel>): UserModel {
    return new UserModel(props);
  }
}
