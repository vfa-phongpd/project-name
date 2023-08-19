import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Group } from "./group.entity";
import { Voucher } from "./voucher.entity";
import { User } from "./user.entity";


@Entity('users_used_vouchers')
export class UsersUsedVoucher {

    @Column({ primary: true })
    id: number;

    @Column({ primary: true })
    voucher_id


    @ManyToOne(() => User, User => User.users_used_vouchers)
    @JoinColumn({ name: 'group_id' })
    user_id: User;


    @ManyToOne(() => Voucher, voucher => voucher.users_used_vouchers)
    @JoinColumn({ name: 'voucher_id' })
    voucher: Voucher;
}
