import { SetMetadata } from "@nestjs/common"
import { Permission } from "src/common/enum/permission.enum";

export const PERMISSTION_KEY = 'permission'
export const Permissions = (...roles: Permission[]) => SetMetadata(PERMISSTION_KEY, roles);