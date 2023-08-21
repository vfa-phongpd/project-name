import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ERROR_RESPONSE } from '../../common/custom-exceptions';
import { ErrorCustom } from '../../common/error-custom';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { PASSWORD } from 'src/common/enum/password.enum.';
import { ROLE } from 'src/common/enum/role.enum';
import { Group } from 'src/entities/group.entity';
import { Voucher } from 'src/entities/voucher.entity';
import { UsersUsedVoucher } from 'src/entities/users_used_voucher.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Voucher) private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(UsersUsedVoucher) private readonly UserUsedVoucherRepository: Repository<UsersUsedVoucher>,


    private readonly roleService: RolesService,
    private readonly permissionService: PermissionsService,
    private dataSource: DataSource
  ) { }

  async createUser(createUserDto: CreateUserDto, idUserCreate: number) {
    const { email } = createUserDto
    const checkEmailInValid = await this.findOne(email)

    if (checkEmailInValid) {
      throw new ErrorCustom(ERROR_RESPONSE.InvalidEmail)
    }

    const queryRunner = this.dataSource.createQueryRunner();

    const checkPassword = await this.checkPassord(createUserDto.password)

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = await this.roleService.findOne(createUserDto.role_id)
      if (idUserCreate !== ROLE.ADMIN) {
        if (createUserDto.role_id === ROLE.ADMIN || createUserDto.role_id === ROLE.GROUP_ADMIN) {
          throw new ErrorCustom(ERROR_RESPONSE.Unauthorized)
        }
      }

      const dataCreateUsers = await this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: checkPassword,
        gender: createUserDto.gender,
        birthday: createUserDto.birthday,
        created_at: new Date(),
        created_by: idUserCreate,
        role_id: role
      })
      await queryRunner.manager.save(User, dataCreateUsers);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ErrorCustom(ERROR_RESPONSE.InsertDataFailed)
    } finally {
      await queryRunner.release();
    }
  }


  findAll(role_id: any) {
    return this.permissionService.getPermissionsForRoleId(role_id)
  }

  async findOne(email: string): Promise<User> {
    try {

      const infoUser = await this.userRepository.findOne({ where: { email } })
      return infoUser
    } catch (error) {
    }
  }

  async checkPassord(password: string) {
    if (password) {
      return await bcrypt.hash(password, 10)
    }
    return await bcrypt.hash(PASSWORD.PASSWORD_DEFAULT, 10)
  }

  async userUseVouchers(userId: number, voucherId: number) {

    await this.getUserVouchers(userId, voucherId)

    const checkAndCreateUsedVouchers = await this.CheckAndCreateUsedVouchers(userId, voucherId)
    return checkAndCreateUsedVouchers

  }

  async getUserVouchers(userId: number, voucherId: number) {
    const userHaveVouchers = await this.userRepository.find({
      where: {
        id: userId
      },
      relations: [
        'group_id',
        'group_id.groups_vouchers.voucher',

      ],
    });
    const findVoucherOfUser = userHaveVouchers.some(data => data.group_id.groups_vouchers.some(dataVoucher => dataVoucher.voucher_id === voucherId))
    if (!findVoucherOfUser) {
      throw new ErrorCustom(ERROR_RESPONSE.UserNotHaveVoucher)
    }
    return userHaveVouchers
  }

  async CheckAndCreateUsedVouchers(userId: number, voucherId: number) {
    const findUsers = await this.userRepository.findOneBy({ id: userId })
    const findVouchers = await this.voucherRepository.findOneBy({ voucher_id: voucherId })
    if (findUsers) {
      if (findVouchers) {
        const findAllVouchersUsed = await this.UserUsedVoucherRepository.find()
        const check = findAllVouchersUsed.some(data => data.id === findUsers.id && data.voucher_id === findVouchers.voucher_id)

        if (check === true) {
          throw new ErrorCustom(ERROR_RESPONSE.VoucherUsed)
        }
        else {
          const createUserUsedVouchers = await this.UserUsedVoucherRepository.create({
            id: findUsers.id,
            voucher_id: findVouchers.voucher_id,
            created_at: new Date()
          })
          await this.UserUsedVoucherRepository.save(createUserUsedVouchers)
          return createUserUsedVouchers
        }
      }
      else {
        throw new ErrorCustom(ERROR_RESPONSE.VoucherNotFound)
      }
    }
    else {
      throw new ErrorCustom(ERROR_RESPONSE.UserNotExits)
    }
  }
}
