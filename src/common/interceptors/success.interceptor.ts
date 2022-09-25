import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //요청이 처리되기 전에 실행될려면 return문 전에 함수를 작성
    //console.log("Before...")

    //Controller에서 Return한 값이 data로 들어간다
    return next.handle().pipe(map((data) => ({ data, success: true })));
  }
}
