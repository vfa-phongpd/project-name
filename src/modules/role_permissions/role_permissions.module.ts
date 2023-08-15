import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';


@Module({

  providers: [RolePermissionsService],
})
export class RolePermissionsModule { }
