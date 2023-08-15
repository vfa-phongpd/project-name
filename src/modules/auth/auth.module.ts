import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { User } from 'src/users/entities/user.entity';


import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStategy } from 'src/vendors/stategy/accesstoken.stategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenStategy],
  // exports: [AuthService, AuthController]
})
export class AuthModule { }
