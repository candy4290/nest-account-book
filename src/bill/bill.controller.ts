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
        this.billService.bill(Object.assign({userId: payload.id}, bill)).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnMsg: 'success!'});
            }
        });
    }

    @Post('detail')
    @UseGuards(new AuthGuard())
    billDetail(@Req() requset: Request, @Res() response: Response, @Body() query: {id: number}) {
        this.billService.billDetail(query.id).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success!'});
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
    billList(@Req() request: Request, @Res() response: Response, @Body() query: {month: string, type?: string}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.billList(payload.id, query.month, query.type).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp.reverse(), rtnMsg: 'success!'});
            }
        });
    }

    @Post('billListOfDay')
    @UseGuards(new AuthGuard())
    billListOfDay(@Req() request: Request, @Res() response: Response, @Body() query: {consumeDate: string, isIncome: boolean}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.billListOfDay(payload.id, query.consumeDate, query.isIncome).then(rsp => {
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
    statisticsDataOfMonth(@Req() request: Request, @Res() response: Response, @Body() query: {month: string}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.statisticsDataOfMonth(payload.id, query.month).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success!'});
            }
        });
    }

    /**
     * 查询当前月份每天的收入总额、支出总额
     *
     * @param {Request} request
     * @param {Response} response
     * @param {{month: string}} query
     * @memberof BillController
     */
    @Post('statisticsDayOfMonth')
    @UseGuards(new AuthGuard())
    statisticsDayOfMonth(@Req() request: Request, @Res() response: Response, @Body() query: {month: string}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.statisticsDayOfMonth(payload.id, query.month).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success!'});
            }
        });
    }

    @Post('billListByRemark')
    @UseGuards(new AuthGuard())
    billListByRemark(@Req() request: Request, @Res() response: Response, @Body() query: {remark: string}) {
        const token = request.headers[tokenConfig.TOKEN_NAME] + '';
        const payload = TokenUtils.parseToken(token);
        this.billService.billListByRemark(payload.id, query.remark).then(rsp => {
            if (rsp) {
                response.status(HttpStatus.OK).json({rtnCode: ApiErrorCode.SUCCESS, rtnData: rsp, rtnMsg: 'success!'});
            }
        });
    }

}
