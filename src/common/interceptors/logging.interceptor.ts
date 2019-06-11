import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    Logger.log('Before...', request.url);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {Logger.log(`After... ${Date.now() - now}ms`, request.url); response.setHeader('access-token', 'cxx')}),
      );
  }
}
