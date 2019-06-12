import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as USER } from './user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(USER)
    private readonly userRepository: Repository<USER>,
              private readonly authService: AuthService) {

  }
  async login(user: User): Promise<boolean> {
    return await this.userRepository.query(`select * from user where username='${user.userName}' and psw='${user.userPsw}'`).then(rsp => {
      if (rsp && rsp.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  async userList(): Promise<User[]> {
    return await this.userRepository.query('select * from user').then(rsp => {
      return rsp;
    });
  }
}
