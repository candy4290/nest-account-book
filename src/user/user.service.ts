import { Injectable, Logger } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Bill } from './interfaces/bill.interface';
import { IUserService } from './interfaces/user-service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as USER } from './user.entity';
import { Bill as BILL } from './entities/bill.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(USER)
    private readonly userRepository: Repository<USER>,
              @InjectRepository(BILL)
    private readonly billRepository: Repository<BILL>) {

  }

  async login(user: User): Promise<number> {
    return await this.userRepository.query(`select * from user where username='${user.userName}' and psw='${user.userPsw}'`).then(rsp => {
      if (rsp && rsp.length > 0) {
        return rsp[0].id;
      } else {
        return null;
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
    return await this.billRepository.insert(Object.assign(bill, {submitDate: new Date().getTime()})).then(rsp => {
      if (rsp.raw.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
}
