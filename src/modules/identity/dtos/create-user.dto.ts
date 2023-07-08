import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'hello@fudy.com',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    required: true,
    type: String,
    minLength: 6,
  })
  password: string;
}
