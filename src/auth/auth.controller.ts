import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  findOne(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return { status: 'Sucess', data: createUserDto };
  }
}
