import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserDto } from './dtos/user-login.dto';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { BillDto } from './dtos/bill.dto';
import { TokenUtils } from '../common/utils/tokenHelper';

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
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

    @Post('bill')
    @UseGuards(new AuthGuard())
    bill(@Req() requset: Request, @Res() response: Response, @Body() bill: BillDto) {
        const token = requset.headers['access-token'] + '';
    }
}
