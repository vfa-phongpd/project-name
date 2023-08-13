import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(email: string) {
    try {
      const infoUser = await this.userRepository.findOne({ relations: { role_id: true }, where: { email } })
      //const infoUser = await this.userRepository.findOne({ where: { email } })
      return infoUser
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  generateAccessToken(email: string, id: number, role: any): Promise<string> {
    const secret: string = process.env.accessToken
    const payload = {
      role,
      email,
      id
    };

    let expiresIn = '1d';
    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
  }
  generateRefreshToken(email: string, id: number, role: any): Promise<string> {
    const secret: string = process.env.refreshToken
    const payload = {
      role,
      email,
      id
    };

    let expiresIn = '2h';
    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
  }

  async validateToken(token: any): Promise<any> {
    try {
      console.log(token);

      const decoded = this.jwtService.verify(token.accessToken);
      return decoded;
    } catch (error) {
      return null; // Handle token validation error appropriately
    }
  }


  async CheckRolesUser(email: string) {
    try {
      const infoUser = await this.userRepository.findOne({ relations: { role_id: true }, where: { email } })
      return infoUser.role_id.role_name
    } catch (error) {
      throw new Error(error)
    }
  }
}
