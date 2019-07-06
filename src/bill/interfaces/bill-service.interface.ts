import { Bill } from './bill.interface';
export interface IBillService {
    /**
     * 记账
     * @param bill
     */
    bill(bill: Bill): Promise<boolean>;
    /**
     * 账单列表
     * @param id 当前用户ID
     * @param month yyyy-MM
     */
    billList(id: number, month: string): Promise<Bill[]>;
}
