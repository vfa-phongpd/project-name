import { PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn, Column } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";

@Entity('roles_permissions')
export class RolePermission {

    @Column({ primary: true })
    role_id: number;

    @Column({ primary: true })
    permission_id

    @ManyToOne(() => Role, role => role.roles_permissions)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToOne(() => Permission, permission => permission.roles_permissions)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;
}
