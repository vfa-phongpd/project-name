import { Module } from '@nestjs/common';
import { UsersUsedVouchersService } from './users_used_vouchers.service';
import { UsersUsedVouchersController } from './users_used_vouchers.controller';

@Module({
  controllers: [UsersUsedVouchersController],
  providers: [UsersUsedVouchersService],
})
export class UsersUsedVouchersModule {}
