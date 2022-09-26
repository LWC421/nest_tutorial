import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  //App전반적으로 Exception을 적용하려면 app.useGlobalFilters를 사용
  app.useGlobalFilters(new HttpExceptionFilter());

  //class-validation을 사용할려면 app에서 use를 해줘야한다.
  app.useGlobalPipes(new ValidationPipe());

  //Express에서 비밀번호를 걸기위해 사용
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  // swagger를 적용할려면 아래와 같이
  const config = new DocumentBuilder()
    .setTitle('Cats')
    .setDescription('Cat Service')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // swagger적용 완료

  // CORS관련 오류 해결
  // origin을 true로 하면 어떤 도메인에서도 접속이 된다 -> 추후 배포시에는 실제 url작성
  app.enableCors({ origin: true, credentials: true });

  await app.listen(PORT);
}
bootstrap();
