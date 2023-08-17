import { Injectable } from '@nestjs/common';
import { CreateGroupsVoucherDto } from './dto/create-groups_voucher.dto';
import { UpdateGroupsVoucherDto } from './dto/update-groups_voucher.dto';

@Injectable()
export class GroupsVouchersService {
  create(createGroupsVoucherDto: CreateGroupsVoucherDto) {
    return 'This action adds a new groupsVoucher';
  }

  findAll() {
    return `This action returns all groupsVouchers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupsVoucher`;
  }

  update(id: number, updateGroupsVoucherDto: UpdateGroupsVoucherDto) {
    return `This action updates a #${id} groupsVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupsVoucher`;
  }
}
