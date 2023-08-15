import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

  ) { }

  async createUser(createUserDto: CreateUserDto, idUserCreate: string) {
    try {


      const { email } = createUserDto
      const checkEmailValid = await this.findOne(email)
      if (checkEmailValid) {
        return {
          code: "A0002",
          status: 400,
          messsage: "Cannot insert data to database"
        }
      }

      const data = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password ? await bcrypt.hash(createUserDto.password, 10) : await bcrypt.hash('member@123', 10),
        gender: createUserDto.gender,
        birthday: createUserDto.birthday,
        created_at: new Date(),
        created_by: idUserCreate,
        role_id: createUserDto.role_id
      })

      return this.userRepository.save(data)
    } catch (error) {
      throw new Error(error)
    }
  }


  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User> {
    try {
      //const infoUser = this.userRepository.findOne({ relations: ["role"], where: { email } })
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
