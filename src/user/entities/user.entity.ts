import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'user',
})
export class User {
    @PrimaryGeneratedColumn({name: 'id', comment: '用户id'})
    id: number;

    @Column({type: 'varchar', name: 'user_name', comment: '用户名'})
    userName: string;

    @Column({type: 'varchar', name: 'user_mobile', nullable: true, comment: '手机号'})
    userMobile: string;

    @Column({type: 'varchar', name: 'psw', comment: '密码'})
    psw: string;

    @Column({type: 'int', name: 'family_id', nullable: true, comment: '家庭编号'})
    familyId: number;

    @Column({type: 'int', name: 'family_role', nullable: true, comment: '家庭角色 1-家主 2-成员', default: 2})
    familyRole: number;
}
