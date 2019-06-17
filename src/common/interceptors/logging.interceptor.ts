import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { TokenUtils } from '../utils/tokenHelper';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';
/**
 * 拦截器----记录每次请求的开始和结束，并在结束时将请求带来的token，刷新token过期时间，并返回
 * TODO 刷新token过期时间&系统超时处理
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
          const newToken = TokenUtils.refreshToken(token);
          if (newToken) {
            response.setHeader('access-token', newToken);
          }
          Logger.log(`After... ${Date.now() - now}ms`, request.url);
          if ((Date.now() - now) / 1000 > 30) {
            throw new ApiException('系统繁忙，请稍后再试！', ApiErrorCode.SYSTEM_TIMEOUT, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }),
      );
  }
}
