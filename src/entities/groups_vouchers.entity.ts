import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity, PrimaryColumn, Column } from "typeorm";
import { Group } from "./group.entity";
import { Voucher } from "./voucher.entity";

@Entity('groups_vouchers')
export class GroupsVouchers {

    @Column({ primary: true })
    group_id: number;

    @Column({ primary: true })
    voucher_id


    @ManyToOne(() => Group, group => group.groups_vouchers)
    @JoinColumn({ name: 'group_id' })
    group: Group;


    @ManyToOne(() => Voucher, voucher => voucher.groups_vouchers)
    @JoinColumn({ name: 'voucher_id' })
    voucher: Voucher;



}
