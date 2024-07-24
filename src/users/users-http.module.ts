import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserStatusProcessor } from './user.status.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'user-status',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserStatusProcessor],
})
export class UserHttpModule {}
