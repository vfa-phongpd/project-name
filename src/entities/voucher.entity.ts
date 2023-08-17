import { IsNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { GroupsVoucher } from "./groups_voucher.entity";

export class Voucher {


    @PrimaryGeneratedColumn()
    voucher_id: number;

    @IsNotEmpty({ message: 'Image can not be null or empty' })
    @Column()
    image: string

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @IsNotEmpty({ message: 'Expired_date can not be null or empty' })
    @Column()
    expired_date: Date

    @IsNotEmpty({ message: 'Details can not be null or empty' })
    @Column({ type: 'text', length: 255 })
    detail: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'int', nullable: false })
    created_by: Number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    deleted_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    @DeleteDateColumn()
    updated_at: Date;

    @Column({ type: 'int', nullable: true })
    updated_by: Number;

    @OneToMany(() => GroupsVoucher, groupsVouchers => groupsVouchers.voucher_id)
    groups_vouchers: GroupsVoucher[]

}
