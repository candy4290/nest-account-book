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
      .where(`userId = :id`, {id})
      .andWhere('consumeType = :type', { type })
      .andWhere(`consumeDate like :param`)
      .setParameters({
        param: `${month.slice(0, 7)}%`,
      })
      .orderBy('consumeDate')
      .getMany();
    } else {
      return queryBuilder
      .where(`userId = :id`, {id})
      .andWhere(`consumeDate like :param`)
      .setParameters({
        param: `${month.slice(0, 7)}%`,
      })
      .orderBy('consumeDate')
      .getMany();
    }
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
