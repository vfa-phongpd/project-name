import { Module } from '@nestjs/common';
import { UsersUsedVouchersService } from './users_used_vouchers.service';
import { UsersUsedVouchersController } from './users_used_vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersUsedVoucher } from 'src/entities/users_used_voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersUsedVoucher])],
  controllers: [UsersUsedVouchersController],
  providers: [UsersUsedVouchersService],
  exports: [UsersUsedVouchersService]
})
export class UsersUsedVouchersModule { }
