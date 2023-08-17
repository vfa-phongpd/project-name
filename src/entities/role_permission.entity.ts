import { PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";

@Entity('roles_permissions')
export class RolePermission {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, role => role.roles_permissions)
    @JoinColumn({ name: 'role_id' })
    role_id: Role;

    @ManyToOne(() => Permission, permission => permission.roles_permissions)
    @JoinColumn({ name: 'permission_id' })
    permission_id: Permission;
}
