import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

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
          const token = request.headers['access-token'];
          if (token) {
            response.setHeader('access-token', token);
          }
          Logger.log(`After... ${Date.now() - now}ms`, request.url);
        }),
      );
  }
}
