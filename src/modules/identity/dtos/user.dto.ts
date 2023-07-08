import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'User id',
    // Sequential id is not a good idea for production
    // but it's fine for this simple test task
    example: 1234,
  })
  id: number;

  @ApiProperty({
    description: 'User email',
    example: 'hello@fudy.com',
  })
  email: string;
}
