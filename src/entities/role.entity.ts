// import { RolePermission } from 'src/role_permissions/entities/role_permission.entity';
import { User } from './user.entity';
import { Permission } from './permission.entity';

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { RolePermission } from './role_permission.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    role_name: string;

    @OneToMany(() => User, (user) => user.role_id)
    users: User[];

    @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    roles_permissions: RolePermission[];

}
