import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode, sign, verify } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('守卫...');
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['access-token'] + '';
    if (!token || !verify(token, 'secretKey')) {
      return false;
    }
    return true;
  }
}
