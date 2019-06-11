import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dtos/user-login.dto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
    }

    @Post('/login')
    // @UseGuards(AuthGuard())
    login(@Res() response: Response, @Body() user: UserDto) {
        Logger.log('controll处理程序...');
        this.user.login(user).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: '登录成功！'});
            } else {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.USER_NOT_VALID, rtnMsg: '用户名或密码错误！'});

            }
        });
    }
}
