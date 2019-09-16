import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', name: 'username', comment: '用户名'})
    username: string;

    @Column('text')
    psw: string;
}
