import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import { RedisService } from './redis.service';

dotenv.config();

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        });
      },
    },
  ],
  exports: [RedisService, 'REDIS'],
})
export class RedisModule {}
