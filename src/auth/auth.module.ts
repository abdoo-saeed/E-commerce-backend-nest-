import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserRepo } from './common/repo/user.repo';
import { SecurityService } from './common/modules/security/security.service';
import { EmailService } from './common/email/email.service';
import { TokenService } from './common/modules/token/token.service';
import { AuthController } from './auth.controller';
import { userModel } from 'src/db/user.schema';

@Module({
  imports: [
    userModel,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    UserRepo,
    SecurityService,
    EmailService,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
