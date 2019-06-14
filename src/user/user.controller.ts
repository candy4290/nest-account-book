import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dtos/user-login.dto';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { TokenUtils } from '../common/utils/tokenHelper';

@Controller('user')
export class UserController {
    constructor(private user: UserService, private readonly auth: AuthService) {
    }

    @Post('/login')
    login(@Res() response: Response, @Body() user: UserDto) {
        Logger.log('controll处理程序...');
        this.user.login(user).then(rsp => {
            if (rsp) {
                const token = TokenUtils.generateToken({id: 1, userName: user.userName});
                if (token) {
                    response.setHeader('access-token', token); // 登录成功后设置header头access-token
                }
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: '登录成功！'});
            } else {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.USER_NOT_VALID, rtnMsg: '用户名或密码错误！'});
            }
        });
    }

    @Post('/list')
    @UseGuards(new AuthGuard())
    userList(@Res() response: Response) {
        this.user.userList().then(rsp => {
            response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success！'});
        });
    }
}
