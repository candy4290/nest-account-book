import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dots/user-login.dto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
    }

    @Post('/login')
    login(@Res() response: Response, @Body() user: UserDto) {
        this.user.login(user).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: '登录成功！'});
            } else {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.USER_NOT_VALID, rtnMsg: '用户名或密码错误！'});

            }
        });
    }
}
