import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { GroupsModule } from '../groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entity';
import { Group } from 'src/entities/group.entity';
import { GroupsVouchers } from 'src/entities/groups_vouchers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Group, GroupsVouchers]),
    GroupsModule],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule { }
