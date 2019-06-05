import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  login(user: User): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}
