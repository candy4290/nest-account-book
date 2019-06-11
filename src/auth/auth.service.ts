import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    Logger.log('创造token');
    Logger.log(accessToken);
    return accessToken;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    Logger.log('用户身份认证！');
    // put some validation logic here
    // for example query user by id/email/username
    // return {};
    return true;
  }
}
