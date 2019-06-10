import { User } from '../interfaces/user.interface';
import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

export class UserDto implements User {
    @IsNotEmpty({message: '用户名必填！', context: {rtnCode: ApiErrorCode.USER_NAME_INVALID}}) readonly userName: string;
    @IsNotEmpty({message: '密码必填！', context: {rtnCode: ApiErrorCode.USER_PSW_INVALID}}) readonly userPsw: string;
}
