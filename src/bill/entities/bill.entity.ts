import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'bill',
})
export class Bill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('text')
    consumeDate: string;

    // tslint:disable-next-line:max-line-length
    @Column({type: 'text', name: 'consumeType', comment: `消费类型 1-餐饮美食 2-交通出行 3-服饰美容 13-生活日用 4-日常缴费 5-文体教育 6-休闲娱乐 7-人情往来 8-公益 9-通讯物流 10-住房物业 11-工资收入 12-其它 14-借款 15-店铺收入 16-店铺支出`})
    consumeType: string;

    @Column({type: 'float', name: 'money', comment: '金额'})
    money: number;

    @Column({type: 'text', name: 'remark', nullable: true, comment: '备注'})
    remark: string;

    @Column('bigint')
    submitDate: number;

    @Column('bigint')
    lastUpdateDate: number;
}
