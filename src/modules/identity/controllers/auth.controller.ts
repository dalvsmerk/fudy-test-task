import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'lib/dtos/error.dto';
import { UserContext } from '../decorators/user.decorator';
import { JwtTokenDto } from '../dtos/jwt-token.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserDto } from '../dtos/user.dto';
import { PasswordsDontMatchError } from '../errors/passwords-dont-match.error';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
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

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve currently authenticated user' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 401, type: ErrorDto })
  async me(@UserContext() user: UserDto): Promise<UserDto> {
    return user;
  }
}
