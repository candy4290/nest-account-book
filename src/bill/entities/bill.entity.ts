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

    @Column('text')
    consumeType: string;

    @Column('float')
    money: number;

    @Column({type: 'text', name: 'remark', nullable: true, comment: '备注'})
    remark: string;

    @Column('bigint')
    submitDate: number;

    @Column('bigint')
    lastUpdateDate: number;
}
