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
    const verified = this.verifyToken(token);
    if (!token || !verified) {
      Logger.log('token认证失败');
      return false;
    }
    Logger.log('token认证成功');
    return true;
  }

  verifyToken(token: string) {
    try {
      verify(token, 'secretKey');
    } catch (error) {
      return false;
    }
    return true;
  }
}
