import { Controller, Post, Res, HttpStatus, Body, UseGuards, Logger, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { BillDto } from '../bill/dtos/bill.dto';
import { TokenUtils } from '../common/utils/tokenHelper';
import { tokenConfig } from '../common/enums/token.enum';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
    constructor(private billService: BillService) {
    }

    /**
     *
     * 入账操作
     * @param {Request} requset
     * @param {Response} response
     * @param {BillDto} bill
     * @memberof BillController
     */
    @Post('bill')
    @UseGuards(new AuthGuard())
    bill(@Req() requset: Request, @Res() response: Response, @Body() bill: BillDto) {
        const token = requset.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.bill(Object.assign({userId: payload['id']}, bill)).then(rsp => {
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
     * @memberof BillController
     */
    @Post('billList')
    @UseGuards(new AuthGuard())
    billList(@Req() request: Request, @Res() response: Response, @Body() query: {month: string}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.billList(payload['id'], query.month).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp.reverse(), rtnMsg: 'success!'});
            }
        });
    }


    /**
     * 查询当前月份消费/收入的统计数据
     *
     * @param {Request} request
     * @param {Response} response
     * @param {{month: string}} query
     * @param {{type: number}} query 1-支出 2-收入
     * @memberof BillController
     */
    @Post('statisticsDataOfMonth')
    @UseGuards(new AuthGuard())
    statisticsDataOfMonth(@Req() request: Request, @Res() response: Response, @Body() query: {month: string, type: number}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.statisticsDataOfMonth(payload['id'], query.month, query.type).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success!'});
            }
        });
    }

}
