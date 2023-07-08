import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
  Max,
  Min,
} from 'class-validator';
import { BaseModel } from 'lib/domain/base.model';

export class UserModel extends BaseModel {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  @IsNotEmpty()
  @Min(5)
  @Max(320)
  readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Max(255)
  readonly password: string;

  constructor(props: Partial<UserModel>) {
    super();

    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
  }
}
