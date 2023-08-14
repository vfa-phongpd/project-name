// import { RolePermission } from 'src/role_permissions/entities/role_permission.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    role_name: string;

    @OneToMany(() => User, (user) => user.role_id)
    users: User[];

    // @ManyToMany(() => Permission)
    // @JoinTable()
    // permissions: Permission[];

}
