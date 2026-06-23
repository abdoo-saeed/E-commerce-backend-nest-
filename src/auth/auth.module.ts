import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel, UserSchema } from 'src/db/user.schema';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
    userModel
  ]

})
export class AuthModule {}
