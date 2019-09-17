import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', name: 'username', comment: '用户名'})
    username: string;

    @Column({type: 'text', name: 'user_mobile', nullable: true, comment: '手机号'})
    userMobile: string;

    @Column({type: 'text', name: 'psw', comment: '密码'})
    psw: string;

    @Column({type: 'int', name: 'family_id', nullable: true, comment: '家庭编号'})
    familyId: number;

    @Column({type: 'int', name: 'family_role', nullable: true, comment: '家庭角色 1-家主 2-成员', default: 2})
    familyRole: number;
}
