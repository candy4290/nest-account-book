import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { decode, sign, verify } from 'jsonwebtoken';
/**
 * 拦截器----记录每次请求的开始和结束，并在结束时将请求带来的token，刷新token过期时间，并返回
 * TODO 刷新token过期时间
 * @export
 * @class LoggingInterceptor
 * @implements {NestInterceptor}
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    Logger.log('Before...', request.url);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const token = request.headers['access-token'] + '';
          if (token) {
            const temp = decode(token);
            const newToken = sign({id: temp['id'], userName: temp['userName']}, 'secretKey', {
              expiresIn: 3600,
            });
            if (newToken) {
              response.setHeader('access-token', newToken);
            }
          }
          Logger.log(`After... ${Date.now() - now}ms`, request.url);
        }),
      );
  }
}
