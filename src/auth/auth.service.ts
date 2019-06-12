import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User as USER } from './../user/user.entity';
// import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    Logger.log('创造token');
    return accessToken;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    Logger.log('用户身份认证！');
    // return this.userRepository.findOne({id: payload.id});
    // put some validation logic here
    // for example query user by id/email/username
    // return {};
    return true;
  }
}
