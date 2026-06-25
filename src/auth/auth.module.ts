import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userModel} from 'src/db/user.schema';
import { UserRepo } from './common/repo/user.repo';
import { SecurityService } from './common/modules/security/security.service';

@Module({
  providers: [AuthService, UserRepo, SecurityService],
  controllers: [AuthController],
  imports:[
  userModel
  ]

})
export class AuthModule {}
