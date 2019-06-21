import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserDto } from './dtos/user-login.dto';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { BillDto } from './dtos/bill.dto';
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

    @Post('/list')
    @UseGuards(new AuthGuard())
    userList(@Res() response: Response) {
        this.user.userList().then(rsp => {
            response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success！'});
        });
    }


    /**
     *
     * 入账操作
     * @param {Request} requset
     * @param {Response} response
     * @param {BillDto} bill
     * @memberof UserController
     */
    @Post('bill')
    @UseGuards(new AuthGuard())
    bill(@Req() requset: Request, @Res() response: Response, @Body() bill: BillDto) {
        const token = requset.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.user.bill(Object.assign({userId: payload['id']}, bill)).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: 'success!'});
            }
        });
    }


    /**
     *
     * 查询当前操作用户的所有账单
     * @param {Request} requset
     * @param {Response} response
     * @param {BillDto} bill
     * @memberof UserController
     */
    @Post('billList')
    @UseGuards(new AuthGuard())
    billList(@Req() requset: Request, @Res() response: Response) {
        const token = requset.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.user.billList(payload['id']).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp.reverse(), rtnMsg: 'success!'});
            }
        });
    }
}
