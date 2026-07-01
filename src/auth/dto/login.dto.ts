import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, {
    message: 'Please provide a valid email address',
  })
  email: string;

  @IsString()
  @Length(8, 50, {
    message: 'Password must be between 8 and 50 characters long',
  })
  password: string;
}