import { Injectable, Logger } from '@nestjs/common';
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

  async billDetail(id: number): Promise<Bill> {
    return await this.billRepository.findOne(id).then(rsp => {
      return rsp;
    });
  }

  async bill(bill: Bill): Promise<boolean> {
    if (!bill.id) {
      return await this.billRepository.insert(Object.assign(bill,
        {
          submitDate: new Date().getTime(),
          lastUpdateDate: new Date().getTime(),
        })).then(rsp => {
        if (rsp.raw.affectedRows > 0) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return await this.billRepository.update(bill.id, Object.assign(bill, {lastUpdateDate: new Date().getTime()})).then(rsp => {
        if (rsp.raw.affectedRows > 0) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  async billList(id: number, month: string, type?: string): Promise<Bill[]> {
    month = month || DateUtils.getDate(0);
    const queryBuilder = this.billRepository.createQueryBuilder();
    if (type) {
      return queryBuilder
      .where(`user_id = :id`, {id})
      .andWhere('consume_type = :type', { type })
      .andWhere(`consume_date like :param`)
      .setParameters({
        param: `${month.slice(0, 7)}%`,
      })
      .orderBy('consume_date')
      .getMany();
    } else {
      return queryBuilder
      .where(`user_id = :id`, {id})
      .andWhere(`consume_date like :param`)
      .setParameters({
        param: `${month.slice(0, 7)}%`,
      })
      .orderBy('consume_date')
      .getMany();
    }
  }

  async statisticsDataOfMonth(id: number, month: string): Promise<any[]> {
    month = month || DateUtils.getDate(0);
    return await this.billRepository
    .query(`select consume_type as consumeType, round(sum(money),2) as money from bill where user_id = ${id}
    and consume_date like '${month.slice(0, 7)}%' group by consume_type`)
      .then(rsp => {
      return rsp;
    });
  }

  async statisticsDayOfMonth(id: number, month: string): Promise<any[]> {
    month = month || DateUtils.getDate(0);
    return await this.billRepository
    .query(`select user_id, consume_date, sum(if(money > 0, money, 0)) as money_in, sum(if(money < 0, money, 0)) as money_out 
      from bill WHERE user_id = ${id} AND consume_date like '${month.slice(0, 7)}%' GROUP BY consume_date order by consume_date`)
    .then(rsp => {
      return rsp;
    })
  }
}
