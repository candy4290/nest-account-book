import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as USER } from './user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(USER)
    private readonly userRepository: Repository<USER>) {

  }
  async login(user: User): Promise<boolean> {
    return await this.userRepository.query(`select * from user where name='${user.userName}' and psw='${user.userPsw}'`).then(rsp => {
      if (rsp) {
        return true;
      } else {
        return false;
      }
    });
  }
}
