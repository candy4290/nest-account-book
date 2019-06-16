import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as USER } from './user.entity';
import { Bill } from './interfaces/bill.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(USER)
    private readonly userRepository: Repository<USER>) {

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

  // async loginout(user: User): Promise<boolean> {
  //   return await this.userRepository.update('')
  // }

  async userList(): Promise<User[]> {
    return await this.userRepository.query('select * from user').then(rsp => {
      return rsp;
    });
  }

  async bill(bill: Bill): Promise<boolean> {
    return;
  }
}
