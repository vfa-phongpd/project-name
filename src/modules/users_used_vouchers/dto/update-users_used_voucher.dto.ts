import { PartialType } from '@nestjs/swagger';
import { CreateUsersUsedVoucherDto } from './create-users_used_voucher.dto';

export class UpdateUsersUsedVoucherDto extends PartialType(CreateUsersUsedVoucherDto) {}
