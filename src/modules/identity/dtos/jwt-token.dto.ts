import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty({
    description: 'JWT access token.',
  })
  accessToken: string;
}
