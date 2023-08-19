import { Injectable } from '@nestjs/common';
import { CreateUsersUsedVoucherDto } from './dto/create-users_used_voucher.dto';
import { UpdateUsersUsedVoucherDto } from './dto/update-users_used_voucher.dto';

@Injectable()
export class UsersUsedVouchersService {
  create(createUsersUsedVoucherDto: CreateUsersUsedVoucherDto) {
    return 'This action adds a new usersUsedVoucher';
  }

  findAll() {
    return `This action returns all usersUsedVouchers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersUsedVoucher`;
  }

  update(id: number, updateUsersUsedVoucherDto: UpdateUsersUsedVoucherDto) {
    return `This action updates a #${id} usersUsedVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersUsedVoucher`;
  }
}
