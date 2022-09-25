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
} from '@nestjs/common';
import { PositiveIntPipe } from 'common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from './cats.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
// USeFilters를 이용하여 커스텀Exception을 적용
// 각각의 API마다 적용할 수도 있음
@UseInterceptors(SuccessInterceptor)
// Interceptor 의존성 주입을 한다
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    console.log('hello Cats');
    return { cats: 'Get All Cats' };
  }

  @Get(':id')
  //@Param안의 piepes에는 여러개의 pipe를 넣을 수 있다
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param) {
    //@Param을 이용해 param을 바로 가져올 수 있다
    //2번째 인자로 변환 pipe를 넣어 타입변환 및 유효성 검사를 할 수 있다
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return;
  }

  @Delete(':id')
  deleteCat() {
    return;
  }
}
