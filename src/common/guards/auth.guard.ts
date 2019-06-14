import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenUtils } from '../utils/tokenHelper';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('守卫...');
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['access-token'] + '';
    if (TokenUtils.verifyToken(token)) {
      Logger.log('token认证成功');
      return true;
    }
    Logger.log('token认证失败');
    return false;
  }

}
