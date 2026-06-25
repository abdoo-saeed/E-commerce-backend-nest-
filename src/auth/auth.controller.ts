import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { AuthService } from './auth.service';
import { User } from 'src/db/user.schema';

@Controller('auth')
export class AuthController {

  constructor(
    private authService:AuthService
  ){}



  @Post("/signUp")
  async signUp(@Body()  body:User){

    const {data} = await this.authService.sinUp(body)

  }

}