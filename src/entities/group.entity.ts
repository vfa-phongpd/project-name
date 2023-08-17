import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, DeleteDateColumn } from 'typeorm';


@Entity('groups')
export class Group {

    @PrimaryGeneratedColumn()
    group_id: number;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @Column()
    group_admin_id: number

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





}
