import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtSignOptions } from './../../../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';





@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}



  async generateOTP(
    { payload,secret, options }:
    { payload: Object, secret:string , options: JwtSignOptions },
  ) {
    options.secret = secret
    const token = await this.jwtService.signAsync(payload, options);
    return token
  }



  async verify({token,secret}){

    const payload = await this.jwtService.verifyAsync(token,{secret})
    return payload

  }


}