import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
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
    private readonly permissionService: PermissionsService

  ) { }

  async createUser(createUserDto: CreateUserDto, idUserCreate: number) {
    const { email } = createUserDto
    const checkEmailInValid = await this.findOne(email)

    if (checkEmailInValid) {
      throw new ErrorCustom(ERROR_RESPONSE.InvalidEmail)
    }

    const checkPassword = await this.checkPassord(createUserDto.password)

    const role = await this.roleService.findOne(createUserDto.role_id)
    if (idUserCreate !== ROLE.ADMIN) {
      if (createUserDto.role_id === ROLE.ADMIN || createUserDto.role_id === ROLE.GROUP_ADMIN) {
        throw new ErrorCustom(ERROR_RESPONSE.Unauthorized)
      }
    }

    const data = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: checkPassword,
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      created_at: new Date(),
      created_by: idUserCreate,
      role_id: role
    })
    return await this.userRepository.save(data)
  }


  findAll(role_id: any) {
    return this.permissionService.getPermissionsForRoleId(role_id)
  }

  async findOne(email: string): Promise<User> {
    try {

      const infoUser = await this.userRepository.findOne({ where: { email } })
      return infoUser
    } catch (error) {
      throw new Error(error)
    }
  }

  async checkPassord(password: string) {
    if (password) {
      return await bcrypt.hash(password, 10)
    }
    return await bcrypt.hash(PASSWORD.PASSWORD_DEFAULT, 10)
  }



}
