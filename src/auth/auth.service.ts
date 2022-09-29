import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.requestDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //해당하는 email에 대한 유저가 존재하는지
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }

    //패스워드가 일치한지 검사
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }

    // JWT만들고 return하기
    const payload = { email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
