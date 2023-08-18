import { Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_RESPONSE } from 'src/common/custom-exceptions';
import { ErrorCustom } from 'src/common/error-custom';
import { Group } from 'src/entities/group.entity';
import { GroupsVouchers } from 'src/entities/groups_vouchers.entity';
import { Voucher } from 'src/entities/voucher.entity';
import { In, Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Injectable()
export class VouchersService {

  constructor(
    @InjectRepository(Voucher) private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupsVouchers) private readonly groupsVouchersRepository: Repository<GroupsVouchers>

  ) { }

  async createVoucher(createVoucherDto: CreateVoucherDto, pathImage: string) {
    const { assign_groups } = createVoucherDto
    console.log("assign_groups", assign_groups);

    if (!pathImage) {
      throw new ErrorCustom(ERROR_RESPONSE.ImageIsRequired)
    }
    const newVoucher = this.voucherRepository.create({
      image: pathImage,
      name: createVoucherDto.name,
      expired_date: createVoucherDto.expired_date,
      detail: createVoucherDto.detail,
      created_at: new Date()
    })


    const findGroup = await this.groupRepository.find({
      where: {
        group_id: In(assign_groups),
      },
    });

    const arrayUser = findGroup.map(group => group.group_id)
    const checkExits = assign_groups.filter(id => !arrayUser.includes(id))
    if (checkExits.length > 0) {
      throw new ErrorCustom(ERROR_RESPONSE.GroupNotExits, checkExits.join(', '))
    }

    const createdVoucher = await this.voucherRepository.save(newVoucher);
    for (const groups of findGroup) {
      const saveGroupsVouchers = await this.groupsVouchersRepository.create({
        group_id: groups.group_id,
        voucher_id: createdVoucher
      })
      // this.groupsVouchersRepository.save(saveGroupsVouchers)
    }
    return createdVoucher;

  }


}
