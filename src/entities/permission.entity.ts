
import { IsNotEmpty } from 'class-validator';
import { Role } from './role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { RolePermission } from './role_permission.entity';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    permission_id: number;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    permission_name: string;

    @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
    roles_permissions: RolePermission[];
}


