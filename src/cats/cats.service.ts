import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repopsitory';

@Injectable()
export class CatsService {
  // constructor에서 의존성을 주입
  constructor(private readonly catsRepository: CatsRepository) {}

  //회원가입 서비스
  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    // const isCatExist = await this.catModel.exists({ email }); //catModel안에 query메소드가 존재한다. -> 이는 constructor에서 주입받은 것
    const isCatExist = await this.catsRepository.existsByEmail(email); //Repository패턴을 적용하면 이렇게 바뀐다

    if (isCatExist) {
      throw new UnauthorizedException('이미 존재하는 고양이입니다'); //HTTP 403과 동일한 역할을 수행
      // throw new HttpException('이미 존재하는 고양이입니다', 403);
    }

    //패스워드를 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // const cat = await this.catModel.create({
    //   email,
    //   name,
    //   password: hashedPassword,
    // }); //Model의 create를 이용하여 DB에 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    //schema에서 사용자가 임의로 만든 부분을 사용할 수 있음
    return cat.readOnlyData;
  }
}
