import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission } from 'src/entities/permission.entity';
import { UsersService } from 'src/modules/users/users.service';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { PERMISSTION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private userService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermission = this.reflector.get<Permission[]>(
            PERMISSTION_KEY,
            context.getHandler(),
        );

        if (!requiredPermission) {
            return true; // No permission
        }

        const request = context.switchToHttp().getRequest();
        const roleId = request.user.role;
        const rolePermissions = await this.userService.findAll(roleId);
        const requiredPermissionString = requiredPermission.toString();
        const hasRequiredPermission = rolePermissions.some(role => role.permission_name === requiredPermissionString)

        return hasRequiredPermission;
    }
}