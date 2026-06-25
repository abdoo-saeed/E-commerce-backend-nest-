import { Injectable } from "@nestjs/common";
import CryptoJS from "crypto-js"
import {compare, hash} from "bcrypt"



@Injectable()
export class SecurityService{


    encryption({data,secretKey}:{data:string,secretKey?:string}){

        secretKey = process.env.ENC_KEY as string
        const cipherText = CryptoJS.AES.encrypt(data,secretKey).toString()
        return cipherText
    }


    decryption({cipherText,secretKey}:{cipherText:string,secretKey?:string}){

        secretKey = process.env.ENC_KEY as string
        const bytes = CryptoJS.AES.decrypt(cipherText,secretKey)
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
    }



    async createHash({data, salt = 8} : {data:string , salt?:number}){

        const cipherText = await hash(data,salt)
        return cipherText
    }


    async compareHash({cipher,text}:{cipher:string, text:string}){

        const check = await compare(cipher,text)
        return check

    }

} 