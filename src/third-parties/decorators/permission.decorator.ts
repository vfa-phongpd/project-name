import { SetMetadata } from "@nestjs/common"
import { PERMISSION } from "src/common/enum/permission.enum";

export const PERMISSTION_KEY = 'permission'
export const Permissions = (...roles: PERMISSION[]) => SetMetadata(PERMISSTION_KEY, roles);