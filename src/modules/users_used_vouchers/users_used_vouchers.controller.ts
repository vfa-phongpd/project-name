import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersUsedVouchersService } from './users_used_vouchers.service';
import { CreateUsersUsedVoucherDto } from './dto/create-users_used_voucher.dto';
import { UpdateUsersUsedVoucherDto } from './dto/update-users_used_voucher.dto';

@Controller('users-used-vouchers')
export class UsersUsedVouchersController {
  constructor(private readonly usersUsedVouchersService: UsersUsedVouchersService) {}

  @Post()
  create(@Body() createUsersUsedVoucherDto: CreateUsersUsedVoucherDto) {
    return this.usersUsedVouchersService.create(createUsersUsedVoucherDto);
  }

  @Get()
  findAll() {
    return this.usersUsedVouchersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersUsedVouchersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersUsedVoucherDto: UpdateUsersUsedVoucherDto) {
    return this.usersUsedVouchersService.update(+id, updateUsersUsedVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersUsedVouchersService.remove(+id);
  }
}
