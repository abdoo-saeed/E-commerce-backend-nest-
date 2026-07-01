import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard, type IAuthRequest } from './common/guards/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private authService:AuthService
  ){}



  @Post("signUp")
  async signUp(@Body(CustomValidationPipe)  body:CreateUserDto){

    const {data} = await this.authService.sinUp(body)
    return{data}
  }


  @Post("login")
  async login(@Body() body:LoginDto){

    const {data}= await this.authService.login(body)

    return {
      data
    }
    
  }



  @Get("profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() req:IAuthRequest){

    return {
      data:req.user
    }

  }

}