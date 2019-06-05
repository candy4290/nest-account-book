import { User } from './user.interface';
export interface IUserService {
    login(user: User): Promise<boolean>;
}
