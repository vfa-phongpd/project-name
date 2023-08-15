import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ERROR_RESPONSE } from '../../common/custom-exceptions';
import { ErrorCustom } from '../../common/error-custom';
import { Role } from 'src/entities/role.entity';
import { RolesService } from '../roles/roles.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService

  ) { }

  async createUser(createUserDto: CreateUserDto, idUserCreate: number) {
    const { email } = createUserDto
    const checkEmailValid = await this.findOne(email)
    if (checkEmailValid) {
      throw new ErrorCustom(ERROR_RESPONSE.InvalidEmail)
    }
    const roleAdmin = await this.roleService.findOne(createUserDto.role_id)
    const roleGroup = await this.roleService.findOne(3)
    const data = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password ? await bcrypt.hash(createUserDto.password, 10) : await bcrypt.hash('member@123', 10),
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      created_at: new Date(),
      created_by: idUserCreate,
      role_id: idUserCreate === 1 ? roleAdmin : roleGroup
    })
    return await this.userRepository.save(data)
  }


  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User> {
    try {

      const infoUser = await this.userRepository.findOne({ where: { email } })
      return infoUser
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }



}
