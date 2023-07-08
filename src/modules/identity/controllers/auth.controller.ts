import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'lib/dtos/error.dto';
import { JwtTokenDto } from '../dtos/jwt-token.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordsDontMatchError } from '../errors/passwords-dont-match.error';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { AuthService } from '../services/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, type: JwtTokenDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  async login(@Body() user: LoginDto): Promise<JwtTokenDto> {
    try {
      return await this.authService.authenticate(user.email, user.password);
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof PasswordsDontMatchError
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
