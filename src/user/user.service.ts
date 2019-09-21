import { Injectable, Logger } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as USER } from './entities/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(USER)
    private readonly userRepository: Repository<USER>) {

  }

  async login(user: User): Promise<number> {
    return await this.userRepository.find({
      where: {
        userName: user.userName,
        psw: user.userPsw,
      },
    }).then(rsp => {
      Logger.log(rsp);
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

}
