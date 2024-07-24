import { Processor, Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'bull';

@Injectable()
@Processor('user-status')
export class UserStatusProcessor {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Process('update-status')
  async updateStatus(job: Job<{ userId: number }>) {
    const user = await this.usersRepository.findOneBy({ id: job.data.userId });
    if (user) {
      user.status = true;
      await this.usersRepository.save(user);
    }
  }
}
