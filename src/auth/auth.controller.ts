import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';

@Controller('auth')
export class AuthController {


  @Post('register')
  @UsePipes(new CustomValidationPipe())
  findOne(@Body() createUserDto: CreateUserDto, @Query() x:any) {
    return { status: 'Sucess', data: createUserDto };
  }
}
