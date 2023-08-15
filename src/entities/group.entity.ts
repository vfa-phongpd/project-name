import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';


@Entity('groups')
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, name: 'rolename', unique: true })
    rolename: string;

    @Column()
    group_admin_id: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'int', nullable: false })
    created_by: Number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    delete_at: Date;

    @Column({ type: 'int', nullable: true })
    delete_by: Number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @Column({ type: 'int', nullable: true })
    updated_by: Number;





}
