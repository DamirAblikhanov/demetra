import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDto } from './createUser.dto';
import { RedisService } from 'src/redis/redis.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectQueue('user-status') private userStatusQueue: Queue,
    private readonly redisService: RedisService,
  ) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    await this.userStatusQueue.add('update-status', { userId: user.id }, { delay: 10000 });
    return instanceToPlain(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    const cachedUser = await this.redisService.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException({ error: 'User not found!' });
    }

    await this.redisService.set(`user:${id}`, user, 1800);
    return user;
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
