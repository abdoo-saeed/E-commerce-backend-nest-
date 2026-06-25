import { Injectable } from '@nestjs/common';
import nodemailer from "nodemailer"
import { UserRepo } from '../repo/user.repo';
import { OtpEnum } from '../enums/user.enums';

@Injectable()
export class EmailService {


    constructor(
        private readonly userRepo:UserRepo
    ){}


  async sendEmail({
    to,
    subject,
    html
  }:{
    to:string,
    subject:string,
    html:string
  }) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, 
      service:"gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });



     const info = await transporter.sendMail({
       from: '"Example Team" <team@example.com>', // sender address
       to,
       subject, // subject line 
       html, // HTML body
     });

     
  }


  generateOTP(){
    return Math.ceil(Math.random()* 900000 + 100000)
  }


  async sendOtp(email:string){

    const otp = this.generateOTP()

    await this.userRepo.updateOne({
        filter:{email},
        update:{
            otp:{
                code:otp,
                expireIn:Date.now()+5*60*1000,
                type:OtpEnum.register
            }
        }
    })
    await this.sendEmail({
        to:email,
        subject:"confirm email",
        html:`<h2>your otp ${otp}</h2>`
    })
      

  }


}
