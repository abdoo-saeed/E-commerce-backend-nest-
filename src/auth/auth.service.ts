import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/db/user.schema';
import { EmailService } from './common/email/email.service';
import { SecurityService } from './common/modules/security/security.service';
import { UserRepo } from './common/repo/user.repo';
import { CreateUserDto } from './dto/createUser.dto';
import { TokenService } from './common/modules/token/token.service';

@Injectable()
export class AuthService {

    constructor(
        // @InjectModel(User.name) private readonly _userModel:Model<User>,
        private readonly userRepo:UserRepo,
        private readonly securityService:SecurityService,
        private readonly emailService:EmailService,
        private readonly tokenService:TokenService

    ){}



    async sinUp(userData:CreateUserDto){
        
        const {username,email,password,age,gender,phone} = userData

        const isEmailExist = await this.userRepo.findByEmail(email)

        if(isEmailExist){
            throw new BadRequestException("email already exist")
        }

      const user = await this.userRepo.create({
        username,
        email,
        password: await this.securityService.createHash({data:password}),
        age,
        gender,
        phone: this.securityService.encryption({data:phone}),
      })


      this.emailService.sendOtp(email)


        return{
            data:{
                user
            }
        }
    }





    async login({email, password}:{email:string,password:string}){

        const user = await this.userRepo.findByEmail(email)
        if(!user){
            throw new BadRequestException("in-valid email")
        }
        if(!await this.securityService.compareHash({cipher:user.password,text:password})){
            throw new BadRequestException("in-valid password")
        }

        const accessToken = await this.tokenService.generateOTP({
            payload:{_id:user._id},
            secret:process.env.ACCESS_TOKEN_SIGNATURE as string,
            options:{
                expiresIn:"30M"
            }
        })
        const refreshToken = await this.tokenService.generateOTP({
            payload:{_id:user._id},
            secret:process.env.REFRESH_TOKEN_SIGNATURE as string,
            options:{
                expiresIn:"7D"
            }
        })


        return{
            data:{
                accessToken,
                refreshToken
            }
        }
    }




}
