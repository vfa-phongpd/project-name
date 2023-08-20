import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ERROR_RESPONSE } from '../../common/custom-exceptions';
import { ErrorCustom } from '../../common/error-custom';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { PASSWORD } from 'src/common/enum/password.enum.';
import { ROLE } from 'src/common/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
