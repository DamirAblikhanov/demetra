import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Name should not be empty!' })
  @IsString({ message: 'Name must be a string!' })
  @MaxLength(255, { message: 'Name is too long!' })
  name: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @IsString({ message: 'Email must be a string!' })
  @IsEmail({}, { message: 'Write valid email!' })
  @MaxLength(255, { message: 'Email is too long!' })
  email: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Password should not be empty!' })
  @IsString({ message: 'Password must be a string!' })
  @MaxLength(255, { message: 'Password is too long!' })
  password: string;
}
