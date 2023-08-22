import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { GroupsModule } from '../groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entity';
import { Group } from 'src/entities/group.entity';
import { GroupsVouchers } from 'src/entities/groups_vouchers.entity';
import { S3Service } from './s3.service';
import { UsersUsedVoucher } from 'src/entities/users_used_voucher.entity';
import { UsersUsedVouchersService } from '../users_used_vouchers/users_used_vouchers.service';
import { UsersUsedVouchersModule } from '../users_used_vouchers/users_used_vouchers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Group, GroupsVouchers, UsersUsedVoucher]),
    GroupsModule,
    UsersUsedVouchersModule
  ],
  controllers: [VouchersController],
  providers: [VouchersService, S3Service],
  exports: [TypeOrmModule, VouchersService]
})
export class VouchersModule { }
