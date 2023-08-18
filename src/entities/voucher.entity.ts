import { IsNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, Entity } from "typeorm";
import { GroupsVouchers } from "./groups_vouchers.entity";

@Entity('vouchers')
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
    @Column({ type: 'text' })
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

    @OneToMany(() => GroupsVouchers, groupsVouchers => groupsVouchers.voucher)
    groups_vouchers: GroupsVouchers[]

}
