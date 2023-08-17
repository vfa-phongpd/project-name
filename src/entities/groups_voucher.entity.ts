import { PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
import { Group } from "./group.entity";
import { Voucher } from "./voucher.entity";

export class GroupsVoucher {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Group, group => group.groups_vouchers)
    @JoinColumn({ name: 'group_id' })
    group_id: Role;

    @ManyToOne(() => Voucher, voucher => voucher.groups_vouchers)
    @JoinColumn({ name: 'voucher_id' })
    voucher_id: Permission;

}
