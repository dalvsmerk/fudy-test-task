import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'lib/dtos/error.dto';
import { DuplicateKeyError } from 'lib/errors/duplicate-key.error';
import { ValidationError } from 'lib/errors/validation.error';
import { hashPassword } from 'lib/tools/passwords';
import { UserRepository } from '../database/user.repository';
import { UserModel } from '../domain/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from '../user.mapper';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userRepo: UserRepository) {}

  @Post()
  @ApiResponse({ status: 201, type: UserDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  async postUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    try {
      const userModel = UserModel.of({
        ...dto,
        password: await hashPassword(dto.password),
      });
      // No need for extra service layer since no business logic is involved
      const user = await this.userRepo.create(userModel);

      return UserMapper.toDto(user);
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof DuplicateKeyError
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
