import {
  IsEmail,
  IsEnum,
  IsInt,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { GenderEnum } from '../common/enums/user.enums';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, {
    message: 'Username must be between 3 and 20 characters long',
  })
  username: string;

  @IsEmail({}, {
    message: 'Please provide a valid email address',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsString()
  confirmPassword: string;

  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsPhoneNumber('EG')
  phone: string;
}