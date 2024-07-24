import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHttpModule } from './users/users-http.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'demetra',
      entities: [User],
      synchronize: true,
    }),
    UserHttpModule,
  ],
})
export class AppModule {}
