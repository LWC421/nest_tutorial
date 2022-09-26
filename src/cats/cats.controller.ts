import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  HttpException,
  UseFilters,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { PositiveIntPipe } from 'common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
// USeFilters를 이용하여 커스텀Exception을 적용
// 각각의 API마다 적용할 수도 있음
@UseInterceptors(SuccessInterceptor)
// Interceptor 의존성 주입을 한다
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  //DTO(Data Transfer Object)를 이용하여 입력된 값에 대한 validation을 진행
  @Post()
  async singup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
