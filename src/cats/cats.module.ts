import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

@Module({
  //DB연결할때 imports에서 모델을 넣어준다.
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    //현재 cats와 auth양쪽에서 서로의 module을 사용하므로 순환참조모듈이 발생 -> forwardRef로 해결
    forwardRef(() => AuthModule),
    //Multer모듈을 import한다, dest가 저장이 될 장소
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], //export를 하면 다른 module에서 imports만 하면 해당 도메인에 대한 것들 사용가능
})
export class CatsModule {}
