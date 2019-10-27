import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dtos/user-login.dto';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { TokenUtils } from '../common/utils/tokenHelper';
import { tokenConfig } from '../common/enums/token.enum';

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
    }

    /**
     *
     * 登录
     * @param {Response} response
     * @param {UserDto} user
     * @memberof UserController
     */
    @Post('/login')
    login(@Res() response: Response, @Body() user: UserDto) {
        Logger.log('controll处理程序...');
        this.user.login(user).then((rsp: number) => {
            if (rsp) {
                const token = TokenUtils.generateToken({id: rsp, userName: user.userName});
                if (token) {
                    response.setHeader(tokenConfig.TOKEN_NAME, token); // 登录成功后设置header头access-token
                }
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: '登录成功！'});
            } else {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.USER_NOT_VALID, rtnMsg: '用户名或密码错误！'});
            }
        });
    }

    @Get('/testJsonP')
    testJsonP(@Res() response: Response, @Query('callback') callback: any = 'callback') {
        Logger.log('controll处理程序...');
        response.status(HttpStatus.OK).send(`${callback}("JSONP成功返回")`);
    }

    @Post('/list')
    @UseGuards(new AuthGuard())
    userList(@Res() response: Response) {
        this.user.userList().then(rsp => {
            response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success！'});
        });
    }

}
