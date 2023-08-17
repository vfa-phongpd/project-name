import { Module } from '@nestjs/common';
import { GroupsVouchersService } from './groups_vouchers.service';


@Module({

  providers: [GroupsVouchersService],
})
export class GroupsVouchersModule { }
