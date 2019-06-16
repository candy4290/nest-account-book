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

    @Column('int')
    money: number;

    @Column('text')
    remark: string;

    @Column('bigint')
    submitDate: number;
}