import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // passport전략에 대한 부분
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // JWT생성을 위한 module
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule), //cats.module.ts에서 CatsRepository를 exports하였으므로 Module로 접근하였을때 사용이 가능해진다
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
