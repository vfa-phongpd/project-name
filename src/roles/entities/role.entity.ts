// import { RolePermission } from 'src/role_permissions/entities/role_permission.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_name: string;

    @OneToMany(() => User, (User) => User.role)
    users: Role[]

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[];

}
