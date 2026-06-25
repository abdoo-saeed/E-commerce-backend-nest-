import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/user.schema';
import { UserRepo } from './common/repo/user.repo';
import { SecurityService } from './common/modules/security/security.service';

@Injectable()
export class AuthService {

    constructor(
        // @InjectModel(User.name) private readonly _userModel:Model<User>,
        private readonly userRepo:UserRepo,
        private readonly securityService:SecurityService
    ){}



    async sinUp(userData:User){
        
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




        return{
            data:{}
        }
    }
}
