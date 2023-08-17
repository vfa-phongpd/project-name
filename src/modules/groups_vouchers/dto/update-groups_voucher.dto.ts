import { PartialType } from '@nestjs/swagger';
import { CreateGroupsVoucherDto } from './create-groups_voucher.dto';

export class UpdateGroupsVoucherDto extends PartialType(CreateGroupsVoucherDto) {}
