import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  //App전반적으로 Exception을 적용하려면 app.useGlobalFilters를 사용
  app.useGlobalFilters(new HttpExceptionFilter());

  //class-validation을 사용할려면 app에서 use를 해줘야한다.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
