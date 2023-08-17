import { Module } from '@nestjs/common';
import { GroupsVouchersService } from './groups_vouchers.service';
import { GroupsVouchersController } from './groups_vouchers.controller';

@Module({
  controllers: [GroupsVouchersController],
  providers: [GroupsVouchersService],
})
export class GroupsVouchersModule {}
