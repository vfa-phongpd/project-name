import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Group } from "./group.entity";
import { Voucher } from "./voucher.entity";

@Entity('groups_vouchers')
export class GroupsVouchers {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Group, group => group.groups_vouchers)
    @JoinColumn({ name: 'group_id' })
    group_id: Group;

    @ManyToOne(() => Voucher, voucher => voucher.groups_vouchers)
    @JoinColumn({ name: 'voucher_id' })
    voucher_id: Voucher;



}
