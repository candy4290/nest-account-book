import { Injectable } from '@nestjs/common';
import { Bill } from './interfaces/bill.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill as BILL } from './entities/bill.entity';
import { DateUtils } from 'src/common/utils/date';
import { IBillService } from './interfaces/bill-service.interface';
@Injectable()
export class BillService implements IBillService {
  constructor(@InjectRepository(BILL)
    private readonly billRepository: Repository<BILL>) {

  }

  async bill(bill: Bill): Promise<boolean> {
    return await this.billRepository.insert(Object.assign(bill, {submitDate: new Date().getTime()})).then(rsp => {
      if (rsp.raw.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  async billList(id: number, month: string): Promise<Bill[]> {
    month = month || DateUtils.getDate(0);
    return await this.billRepository.query(`select * from bill where userId = ${id} and consumeDate like '${month.slice(0, 7)}%'`).then(rsp => {
      return rsp;
    });
  }

  async statisticsDataOfMonth(id: number, month: string): Promise<any[]> {
    month = month || DateUtils.getDate(0);
    return await this.billRepository
    .query(`select consumeType, round(sum(money),2) as money from bill where userId = ${id}
    and consumeDate like '${month.slice(0, 7)}%' group by consumeType`)
      .then(rsp => {
      return rsp;
    });
  }
}
