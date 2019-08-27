import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { Bill } from '../interfaces/bill.interface';

export class BillDto implements Bill {
    @IsNotEmpty({message: '消费日期必填！', context: {rtnCode: ApiErrorCode.CONSUME_DATE_INVALID}}) readonly consumeDate: string;
    @IsNotEmpty({message: '消费类型必填！', context: {rtnCode: ApiErrorCode.CONSUME_TYPE_INVALID}}) readonly consumeType: string;
    @IsNotEmpty({message: '消费金额必填！', context: {rtnCode: ApiErrorCode.CONSUME_MONEY_INVALID}}) readonly money: number;
    remark: string;
    id?: number;
}
