import { Controller, Get, Post, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUser.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const emailExists = await this.usersService.findUserByEmail(email);
    if (emailExists) {
      throw new UnauthorizedException({ error: `This email already exists!` });
    }

    const createdUser = await this.usersService.createNewUser(createUserDto);
    return createdUser;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    if (isNaN(id) || !id.toString().trim()) {
      throw new BadRequestException({ error: 'Invalid ID format' });
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException({ error: 'User not found!' });
    }
    return user;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    if (isNaN(id) || !id.toString().trim()) {
      throw new BadRequestException({ error: 'Invalid ID format' });
    }

    const user = await this.usersService.deleteUserById(id);
    if (user.affected === 0) {
      throw new NotFoundException({ error: 'User not found!' });
    }
    return user;
  }
}
