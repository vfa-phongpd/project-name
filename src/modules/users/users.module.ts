import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RolesModule } from '../roles/roles.module';
import { Role } from 'src/entities/role.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { Group } from 'src/entities/group.entity';
import { UsersUsedVouchersModule } from '../users_used_vouchers/users_used_vouchers.module';
import { UsersUsedVoucher } from 'src/entities/users_used_voucher.entity';
import { VouchersService } from '../vouchers/vouchers.service';
import { Voucher } from 'src/entities/voucher.entity';
import { VouchersModule } from '../vouchers/vouchers.module';
import { GroupsModule } from '../groups/groups.module';
import { GroupsVouchers } from 'src/entities/groups_vouchers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersUsedVoucher, GroupsVouchers, Group, Voucher]),
    RolesModule,
    PermissionsModule,
    UsersUsedVouchersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule { }
