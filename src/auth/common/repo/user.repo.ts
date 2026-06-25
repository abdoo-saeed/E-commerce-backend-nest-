import { User } from "src/db/user.schema";
import DBRepo from "./DB.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";



@Injectable()
export class UserRepo extends DBRepo<User>{
    constructor(@InjectModel(User.name)private readonly userModel:Model<User>){
        super(userModel)
    }


    async findByEmail(email:string){

       return this.findOne({email})
    }
}