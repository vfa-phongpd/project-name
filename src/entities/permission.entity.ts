
import { IsNotEmpty } from 'class-validator';
import { Role } from './role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, name: 'permissionname', unique: true })
    permission_name: string;

    // @ManyToMany(() => Role, Role => Role.permissions)
    // roles: Role[];
}


