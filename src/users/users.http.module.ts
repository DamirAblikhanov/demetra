import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserStatusProcessor } from './user.status.processor';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule,
    BullModule.registerQueue({
      name: 'user-status',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserStatusProcessor, RedisService],
})
export class UsersHttpModule {}
