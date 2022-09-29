import {
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
  Body,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.requestDto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
// USeFilters를 이용하여 커스텀Exception을 적용
// 각각의 API마다 적용할 수도 있음
@UseInterceptors(SuccessInterceptor)
// Interceptor 의존성 주입을 한다
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @ApiBearerAuth() //Token이 필요하면 ApuBearerAuth로 표시
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  //ApiOperation을 사용하면 Swagger에서 표출 해준다
  @ApiOperation({ summary: '회원가입' })
  //ApiResponse에서는 해당 상태코드에 대한 설명을 넣을 수 있다
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  //DTO(Data Transfer Object)를 이용하여 입력된 값에 대한 validation을 진행
  @Post()
  async singup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload')
  @UseInterceptors(FilesInterceptor('iamge', 10, multerOptions('cats')))
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return 'uploadImg';
  }
}
