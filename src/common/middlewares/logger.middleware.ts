import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); //HTTP에 대한 Logger를 사용하기로 선언

  use(req: Request, res: Response, next: NextFunction) {
    /* Nest에서 로그 찍을 때는 logger를 사용 */
    res.on('finish', () => {
      //Response가 Finish(즉, 끝났을 때) log를 찍기로
      this.logger.log(`${req.ip}, ${req.method}, ${req.originalUrl}`);
      this.logger.log(res.statusCode);
    });
    /**/

    next();
  }
}
