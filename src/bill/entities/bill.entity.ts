import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
    name: 'bill',
})
export class Bill {
    @PrimaryGeneratedColumn('uuid', {name: 'id', comment: '账单编号uuid'})
    id: number;

    @Column({type: 'int', name: 'user_id', comment: '用户id'})
    userId: number;

    @Column({type: 'varchar', name: 'consume_date', comment: '账单发生日期'})
    consumeDate: string;

    // tslint:disable-next-line:max-line-length
    @Column({type: 'varchar', name: 'consume_type', comment: `消费类型 1-餐饮美食 2-交通出行 3-服饰美容 13-生活日用 4-日常缴费 5-文体教育 6-休闲娱乐 7-人情往来 8-公益 9-通讯物流 10-住房物业 11-工资收入 12-其它 14-借款 15-店铺收入 16-店铺支出`})
    consumeType: string;

    @Column({type: 'float', name: 'money', comment: '金额'})
    money: number;

    @Column({type: 'varchar', name: 'remark', nullable: true, comment: '备注'})
    remark: string;

    @Column({type: 'bigint', name: 'submit_date', comment: '提交时间'})
    submitDate: number;

    @Column({type: 'bigint', name: 'last_update_date', comment: '最后更新时间'})
    lastUpdateDate: number;
}
