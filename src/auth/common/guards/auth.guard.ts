import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { TokenService } from "../modules/token/token.service";
import { IHUser } from "src/db/user.schema";



export interface IAuthRequest extends Request{
    user?:IHUser
}




@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly tokenService:TokenService
    ){}



    async canActivate(context: ExecutionContext): Promise<boolean>{

        const contextType = context.getType()
        let authorization!:string
        let req!:IAuthRequest

        switch (contextType) {
            case "http":
                 req = context.switchToHttp().getRequest()
                authorization = req.headers.authorization as string
                break;
        
            default:
                authorization = ""
                break;
        }

        const user = await this.tokenService.decodeToken(authorization)

        if(!user){
            throw new BadRequestException("in_valid auth")
        }
        req.user = user
        return true

        
    }

}