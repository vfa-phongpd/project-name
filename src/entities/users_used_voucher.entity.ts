import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Group } from "./group.entity";
import { Voucher } from "./voucher.entity";
import { User } from "./user.entity";


@Entity('users_used_vouchers')
export class UsersUsedVoucher {

    @Column({ primary: true })
    id: number;

    @Column({ primary: true })
    voucher_id

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, User => User.users_used_vouchers)
    @JoinColumn({ name: 'id' })
    user: User;


    @ManyToOne(() => Voucher, voucher => voucher.users_used_vouchers)
    @JoinColumn({ name: 'voucher_id' })
    voucher: Voucher;
}
