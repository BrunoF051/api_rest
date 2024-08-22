import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { FindUsersDto } from './dto/find-users.dto';
import {
  AuthenticatedUser,
  Public,
  Roles,
  RoleMatchingMode,
} from 'nest-keycloak-connect';

@Controller('users') // Set the route prefix for HTTP routes
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // MessagePattern for creating a user (microservices)
  @MessagePattern('createUser')
  async createMessage(
    @Payload() createUserDto: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  // MessagePattern for finding all users (microservices)
  @MessagePattern('findAllUsers')
  async findAllMessage(@Payload() params: FindUsersDto): Promise<User[]> {
    return this.usersService.users(params);
  }

  // MessagePattern for finding a single user by ID (microservices)
  @MessagePattern('findOneUser')
  async findOneMessage(@Payload() id: number): Promise<User | null> {
    return this.usersService.user({ id });
  }

  // MessagePattern for updating a user (microservices)
  @MessagePattern('updateUser')
  async updateMessage(
    @Payload() updateUserDto: { id: number; data: Prisma.UserUpdateInput },
  ): Promise<User> {
    const { id, data } = updateUserDto;
    return this.usersService.updateUser({
      where: { id },
      data,
    });
  }

  // MessagePattern for deleting a user (microservices)
  @MessagePattern('removeUser')
  async removeMessage(@Payload() id: number): Promise<User> {
    return this.usersService.deleteUser({ id });
  }

  // HTTP endpoint for creating a user
  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  // HTTP endpoint for finding all users
  @Get()
  async findAll(@Query() params: FindUsersDto): Promise<User[]> {
    return this.usersService.users(params);
  }

  // HTTP endpoint for finding a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.user({ id });
  }

  // HTTP endpoint for updating a user
  @Put(':id')
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: { id },
      data,
    });
  }

  // HTTP endpoint for deleting a user
  @Delete(':id')
  @Roles({ roles: ['user', 'admin'], mode: RoleMatchingMode.ALL })
  async remove(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser({ id });
  }
}
